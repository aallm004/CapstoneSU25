"""Admin Tool
Provides Web Interface and Restful API for managing suicide prevention 
triggers and handling conversations with users.

RESTful API: Json endpoints for programmatic access (curl, frontend)"""

import json
import requests
from datetime import datetime
import webbrowser
import os
import sys
import subprocess


api = "https://dczq55guecss3nfqektmhapolq0dgnkw.lambda-url.us-east-1.on.aws/"
key = ""

def get_auth_headers(api_key):
    """Return headers with Authorization for authenticated requests"""
    return {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

def format_grid_display(items, show_responses=False):
    """Format items in a three-column grid: number, trigger, response"""
    if not items:
        return []
    
    # Calculate the maximum trigger width
    max_trigger_width = max(len(item['trigger']) for item in items)
    
    # Reserve space for: number column (4 chars), spaces (4 chars), total width limit (80)
    num_col_width = 4  # "999." format
    spacing = 4  # spaces between columns
    available_for_trigger_and_response = 80 - num_col_width - spacing
    
    # Trigger column should be as wide as needed, but leave room for response
    trigger_col_width = min(max_trigger_width, available_for_trigger_and_response - 10)  # Reserve at least 10 chars for response
    response_col_width = available_for_trigger_and_response - trigger_col_width - 2  # 2 more spaces
    
    formatted_lines = []
    
    for i, item in enumerate(items, 1):
        num_part = f"{i}.".ljust(num_col_width)
        trigger_part = item['trigger'][:trigger_col_width].ljust(trigger_col_width)
        
        if show_responses:
            response_text = item['response']
            # Truncate response if too long, add ellipsis
            if len(response_text) > response_col_width:
                response_part = response_text[:response_col_width-3] + "..."
            else:
                response_part = response_text
        else:
            response_part = ""
        
        line = f"{num_part} {trigger_part}  {response_part}"
        formatted_lines.append(line.rstrip())  # Remove trailing spaces
    
    return formatted_lines

def open_system_prompt_editor(key):
    """ this just opens a web page with the current key."""

    try:
        # Create a token from the API key
        print("Creating temporary token...")
        
        headers = {
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json"
        }
        
        token_response = requests.post(f"{api}token", headers=headers)
        
        if token_response.status_code == 200:
            token_data = token_response.json()
            token = token_data.get('token')
            
            if not token:
                print("Error: No token returned from API")
                return
                
            print("Token created successfully")
        else:
            print(f"Error creating token: {token_response.status_code} - {token_response.text}")
            return
            
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to API: {e}")
        return
    except Exception as e:
        print(f"Unexpected error: {e}")
        return

    # Get the full path to the HTML file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(current_dir, "systemprompt.html")
    url = f"file://{html_file}?key={token}"
    
    # Try different methods to open Chrome
    chrome_commands = []
    
    if sys.platform == "win32":
        chrome_commands = [
            "C:/Program Files/Google/Chrome/Application/chrome.exe",
            "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        ]
    elif sys.platform == "darwin":  # macOS
        chrome_commands = [
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        ]
    else:  # Linux
        chrome_commands = [
            "google-chrome",
            "google-chrome-stable",
            "chromium-browser",
            "chromium"
        ]

    # Try to launch Chrome directly
    for chrome_cmd in chrome_commands:
        try:
            subprocess.run([chrome_cmd, url], check=True)
            print(f"Opened system prompt editor in Chrome: {url}")
            return
        except (subprocess.CalledProcessError, FileNotFoundError):
            continue
    
    # Fallback to default browser
    try:
        webbrowser.open(url)
        print(f"Opened system prompt editor in default browser: {url}")
    except Exception as e:
        print(f"Could not open browser: {e}")
        print(f"Please manually open: {url}")

def dashboard():
    key = input('Please provide authorization key: ')
    show_responses = False

    while True:
        response = requests.get(api).json()
        _, items = list(response.items())[2]

        itemId = []
        itemTrigger = []
        itemResponse = []

        # Store data for later use
        for e in items:
            itemId.append(e['id'])
            itemTrigger.append(e['trigger'])
            itemResponse.append(e['response'])
        
        # Display formatted grid
        formatted_lines = format_grid_display(items, show_responses)
        max_length = max(len(line) for line in formatted_lines)
        print("\n" + "=" * max_length)
        print("Current saved triggers:")

        for line in formatted_lines:
            print(line)
        
        print("=" * max_length)
        responses_option = "[h]ide responses" if show_responses else "[s]how responses"
        prompt = input(f"Would you like to:\n  [a]dd\n  [r]emove\n  [e]dit\n  {responses_option}\n  re[n]ter API key\n  [u]pdate System Prompt\n  [q]uit\n ")

        if prompt.lower() == "a":
            trigger = input("What trigger word would you like to add? ")
            if trigger == "":
                continue
            response = input("What is the response to this trigger? ")
            if response == "":
                continue
            payload = {
                "trigger": trigger,
                "response": response
            }
            headers = get_auth_headers(key)
            try:
                outcome = requests.post(api, json=payload, headers=headers)
                if outcome.status_code == 201:
                    print("Your new trigger has been added!")
                else:
                    print(f"Failure {outcome.status_code} {outcome.text}")
            except requests.exceptions.RequestException as e:
                print(f"Request Failed {e}")

        elif (prompt.lower() == "s") or (prompt.lower() == "h"):
            show_responses = not show_responses

        elif prompt.lower() == "r":
            prompt = input("Which trigger word would you like to remove? ")
            delete_url = f"{api}item/{itemId[int(prompt)-1]}/"
            headers = get_auth_headers(key)
            try:
                outcome = requests.delete(delete_url, headers=headers)
                if outcome.status_code == 200:
                    print("Trigger has been removed!")
                else:
                    print(f"Failure {outcome.status_code} {outcome.text}")
            except requests.exceptions.RequestException as e:
                print(f"Request Failed {e}")
        
        elif prompt.lower() == "e":
            prompt = input("Which trigger would you like to change? ")
            try:
                oldTrigger = itemTrigger[int(prompt)-1]
                newTrigger = input(f"How would you like to change this word? [{oldTrigger}] ")
                if newTrigger == '':
                    newTrigger = oldTrigger
                oldResponse = itemResponse[int(prompt)-1]
                newResponse = input(f"What would you like your new response to be? [{oldResponse}] ")
                if newResponse == '':
                    newResponse = oldResponse
                
                if oldTrigger == newTrigger and oldResponse == newResponse:
                    print("Nothing to change")
                    continue
                
                payload = {
                    "trigger": newTrigger,
                    "response": newResponse
                }
                update_url = f"{api}item/{itemId[int(prompt)-1]}"
                headers = get_auth_headers(key)
                
                try:
                    outcome = requests.put(update_url, json=payload, headers=headers)
                    if outcome.status_code == 200:
                        print("Your trigger has been updated!")
                    else:
                        print(f"Failure {outcome.status_code} {outcome.text}")
                except requests.exceptions.RequestException as e:
                    print(f"Request Failed {e}")
            except: # if there are any issues with stuff, just bail.
                print("Invalid option there! Try again!")
                continue

        elif prompt.lower() == "n":
            key = input('Please provide authorization key: ')

        elif prompt.lower() == "u":
            open_system_prompt_editor(key)

        elif prompt.lower() == "q":
            break

dashboard()

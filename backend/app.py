"""Admin Panel
Provides Web Interface and Restful API for managing suicide prevention 
triggers

Web Interface: HTML pages for browswer
RESTful API: Json endpoints for programmatic access (curl, frontend)"""
import json
import requests
from datetime import datetime

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

def dashboard():
    key = input('Please provide authorization key: ')
    show_responses = False

    while True:
        response = requests.get(api).json()
        _, items = list(response.items())[2]

        print("\n" + "=" * 80)
        print("Current triggers:")
        
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
        for line in formatted_lines:
            print(line)
        
        print("=" * 80)
        responses_option = "[h]ide responses" if show_responses else "[s]how responses"
        prompt = input(f"Would you like to:\n  [a]dd\n  [r]emove\n  [e]dit\n  {responses_option}\n  [q]uit\n ")

        if prompt.lower() == "a":
            trigger = input("What trigger word would you like to add? ")
            response = input("What is the response to this trigger? ")
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

        elif prompt.lower() == "s":
            show_responses = True

        elif prompt.lower() == "h":
            show_responses = False

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

        elif prompt.lower() == "q":
            break

dashboard()

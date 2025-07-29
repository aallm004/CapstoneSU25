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

def dashboard():
    key = input('Please provide authorization key: ')
    show_responses = False

    while True:
        response = requests.get(api).json()
        _, items = list(response.items())[2]

        print("\n" + "=" * 50)
        print("Current triggers: ")
        itemId = []
        itemTrigger = []
        itemResponse = []

        i = 0
        for e in items:
            i = i + 1
            response_part = f" [{e['response']}]" if show_responses else ""
            print(f"{i}. {e['trigger']}{response_part}")

            # trigger=kill     response=Call 988
            itemId.append(e['id'])
            itemTrigger.append(e['trigger'])
            itemResponse.append(e['response'])
        print("=" * 50)
        responses_option = "[h]ide responses" if show_responses else "[s]how responses"
        prompt = input(f"Would you like to:\n  [a]dd\n  [r]emove\n  [e]dit\n  {responses_option}\n  [q]uit\n ")

        if prompt.lower() == "a":
            trigger = input("What trigger word would you like to add? ")
            response = input("What is the response to this trigger? ")
            payload = {
                "trigger": trigger,
                "response": response
            }
            addUrl = f"{api}?key={key}"
            headers = {
                "Content-Type": 'application/json'
            }
            try:
                outcome = requests.post(addUrl, json=payload, headers=headers)
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
            deleteUrl = f"{api}item/{itemId[int(prompt)-1]}/?key={key}"
            requests.delete(deleteUrl)
        
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
              payload = {
                  "trigger": newTrigger,
                  "response": newResponse
              }
              updateUrl = f"{api}item/{itemId[int(prompt)-1]}?key={key}"
              headers = {
                  "Content-Type": 'application/json'
              }
              if oldTrigger == newTrigger and oldResponse == newResponse:
                  print("Nothing to change")
                  continue

              try:
                outcome = requests.put(updateUrl, json=payload, headers=headers)
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

#!/usr/bin/env python3
import json
import subprocess
import sys

# Load prompts
with open('prompts.json', 'r') as f:
    prompts = json.load(f)

slm_responses = {}

print("Generating SLM responses using Ollama (deepseek-r1:1.5b)...\n")

for item in prompts:
    prompt_id = str(item['id'])
    prompt_text = item['prompt']

    print(f"Processing prompt {prompt_id}: {prompt_text[:50]}...")

    # Run ollama with the prompt
    try:
        result = subprocess.run(
            ['ollama', 'run', 'deepseek-r1:1.5b', prompt_text],
            capture_output=True,
            text=True,
            timeout=30
        )

        response = result.stdout.strip()
        slm_responses[prompt_id] = response
        print(f"  ✓ Got response ({len(response)} chars)\n")

    except subprocess.TimeoutExpired:
        print(f"  ✗ Timeout\n")
        slm_responses[prompt_id] = "[Response timed out]"
    except Exception as e:
        print(f"  ✗ Error: {e}\n")
        slm_responses[prompt_id] = f"[Error: {e}]"

# Save responses
with open('slm_responses.json', 'w') as f:
    json.dump(slm_responses, f, indent=2)

print(f"\nSaved {len(slm_responses)} responses to slm_responses.json")

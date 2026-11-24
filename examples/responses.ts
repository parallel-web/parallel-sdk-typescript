#!/usr/bin/env -S yarn tsn -T

import Parallel from 'parallel-web';

async function main() {
  const client = new Parallel();
  const prompt = 'What is the capital of France? Answer in one sentence.';

  const response = await client.responses.create({ model: 'parallel', input: prompt });
  for (const item of response.output) {
    if (item.type === 'message') {
      for (const part of item.content) console.log(part.text);
    }
  }

  const stream = await client.responses.create({ model: 'parallel', input: prompt, stream: true });
  for await (const event of stream) {
    if (event.type === 'response.output_text.delta') process.stdout.write(event.delta);
  }
  process.stdout.write('\n');
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

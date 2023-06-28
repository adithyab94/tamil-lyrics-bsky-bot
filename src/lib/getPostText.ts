import fs from 'fs';
import readline from 'readline';

export default async function getPostText() {
    const fileStream = fs.createReadStream('new2.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let text = '';

    for await (const line of rl) {
        text += line;
    }

    const sequenceLength = Math.floor(Math.random() * (250 - 75 + 1)) + 75;

    const spaceIndices = [];
    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            spaceIndices.push(i);
        }
    }

    let startIndex = Math.floor(Math.random() * spaceIndices.length);

    if (startIndex + sequenceLength >= text.length) {
        startIndex = 0;
    } else {
        startIndex = spaceIndices[startIndex] + 1;
    }

    let sequence = text.substring(startIndex, startIndex + sequenceLength);
    let nextSpaceIndex = text.indexOf(' ', startIndex + sequenceLength);

    if (nextSpaceIndex === -1) {
        nextSpaceIndex = text.length;
    }

    sequence = text.substring(startIndex, nextSpaceIndex);

    return sequence;
}

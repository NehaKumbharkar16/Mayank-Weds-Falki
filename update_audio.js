const fs = require('fs');
try {
    let content = fs.readFileSync('index.html', 'utf8');
    // Using a regex to find the audio tag with id="bg-audio" regardless of how long it is
    const regex = /<audio id="bg-audio"[\s\S]+?<\/audio>/;
    // Since the original was <audio id="bg-audio" ... src="..."></audio> or just <audio ...>
    // Let's be safer and match up to the next tag or enough context.
    // Actually, looking at the file it's likely on one line but very long.
    
    // Simpler: find the start of the audio tag and the closing quote/bracket of that specific tag.
    // Given the previous view_file, it's one very long line.
    
    const lines = content.split('\n');
    let found = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('id="bg-audio"')) {
            lines[i] = '  <audio id="bg-audio" loop preload="auto" src="WhatsApp Audio 2026-04-03 at 10.51.25 AM.mpeg"></audio>';
            found = true;
            break;
        }
    }
    
    if (found) {
        fs.writeFileSync('index.html', lines.join('\n'));
        console.log('Update successful');
    } else {
        console.log('Audio tag not found');
    }
} catch (err) {
    console.error(err);
}

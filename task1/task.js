import { stdin, stdout } from 'process';

stdin.addListener('data', data => {
    const string = data.toString();
    stdout.write(string.split('').reverse().join('') + '\n', 'utf8');
});

const EventEmitter =require('events');
const readline =require("readline");

const rl=readline.createInterface({
 	input:process.stdin,
 	output:process:stdout
});

const client =new EventEmitter();
const server =require('./server')(client);

server.on('response',(resp)=>{
  process.stdout.write('\u001B[2J\U001B[0,0f]');
  process.stdout.write(resp);
  process.stdout.write('\n\>');
});

rl.on('line',(input)=>{
   console.log(input);
   client.emit('input',input);
})

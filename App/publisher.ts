import amqp from "amqplib";

async function connect(msg:Number) {
    try{
        // tcp connection
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs"); //jobs is queue name
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify({number:msg}))) //(queue name, buffer data)
        console.log("Job sent successfully ",{msg});
    } catch(err) {
        console.log(err);
    }
}

connect(Number(process.argv[2]));
import amqp from "amqplib";

const msg = {number: 19}
connect()
async function connect() {
    try{
        // tcp connection
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs"); //jobs is queue name
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg))) //(queue name, buffer data)
        console.log("Job sent successfully ",msg.number);
    } catch(err) {
        console.log(err);
    }
}


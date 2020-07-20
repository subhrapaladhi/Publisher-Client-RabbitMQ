import amqp from "amqplib";

connect()
async function connect() {
    try{
        // tcp connection
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs"); //jobs is queue name
        
        channel.consume("jobs", message => {
            if(message){
                const input = JSON.parse(message.content.toString());
                if(input.number){
                    console.log(`Received job with input ${input.number}`);
                    channel.ack(message);
                }
            } else {
                console.log("message was empty");
            }
        })

        console.log("waiting for messages....");
    } catch(err) {
        console.log(err);
    }
}


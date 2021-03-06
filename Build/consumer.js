"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
connect();
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // tcp connection
            const connection = yield amqplib_1.default.connect("amqp://localhost:5672");
            const channel = yield connection.createChannel();
            const result = yield channel.assertQueue("jobs"); //jobs is queue name
            channel.consume("jobs", message => {
                if (message) {
                    const input = JSON.parse(message.content.toString());
                    if (input.number) {
                        console.log(`Received job with input ${input.number}`);
                        channel.ack(message);
                    }
                }
                else {
                    console.log("message was empty");
                }
            });
            console.log("waiting for messages....");
        }
        catch (err) {
            console.log(err);
        }
    });
}

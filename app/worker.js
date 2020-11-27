const { PubSub } = require('@google-cloud/pubsub');
const request = require('request');
const ZipStream = require('zip-stream');
const photoModel = require('./photo_model');
const env = require('../project-id-9307823999230114798-b3157dde6a00');

async function quickstart(
    projectId = env.project_id,
    topicName = 'nicolas',
    subscriptionName = 'nicolas'
) {
    const credentials = {
        projectId: env.project_id,
        credentials: env
    };
    const pubsub = new PubSub(credentials);
    const topic = await pubsub.topic(topicName);
    console.log(`Topic ${topic.name}.`);


    function listenForMessages() {
        const timeout = 60;
        const subscription = pubsub.subscription(topicName);

        let messageCount = 0;
        const messageHandler = async message => {
            console.log(`Received message ${message.id}:`);
            console.log(`\tData: ${message.data}`);
            console.log(`\tAttributes: ${message.attributes}`);
            messageCount += 1;

            message.ack();
        };

        subscription.on('message', messageHandler);

        setTimeout(() => {
            subscription.removeListener('message', messageHandler);
            console.log(`${messageCount} message(s) received.`);
        }, timeout * 1000);
    }

    listenForMessages();
}

quickstart(); 
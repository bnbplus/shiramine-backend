var AWSIoTData = require("aws-iot-device-sdk")
var AWS = require("aws-sdk")
var AWSConfiguration = require("./aws-configuration")
const jwt = require("jwt-decode")
class Mqttdata {
  constructor() {
    this.awsCognitoPoolId = AWSConfiguration.poolId;
    this.awsRegion = AWSConfiguration.region;
    this.awsEndPoint = AWSConfiguration.host;

    this.connectIoT();
    this.mqttClient = null;
    this.clientId = "";
    this.topic = null;
  }
  getRandomClientId() {
    return "demo" + Math.floor(Math.random() * 100000 + 1);
  }
  mqttClientConnectHandler() {
    console.log("MQTT Client CONNECTED !!!");
  }
  mqttClientReconnectHandler() {
    console.log("MQTT Client RECONNECTING...");
  }
  mqttClientMessageHandler(topic, payload) {
    console.log("MQTT Client RECEIVING MESSAGE");
    console.log("From topic = " + topic);
    jwt(payload.token) // decode token, we can add token to DB,...
    console.log("Payload = " + payload.toString());
  }
  mqttClientCloseHandler() {
    console.log("MQTT Client CLOSE");
  }
  mqttClientOfflineHandler() {
    console.log("MQTT Client Offline");
  }
  mqttClientErrorHandler() {
    console.log("MQTT Client Error");
  }
  mqttClientPacketSendHandler() {
    console.log("MQTT Client Packet Send");
  }
  mqttClientPacketReceiveHandler() {
    console.log("MQTT Client Packet Receive");
  }
  disconnectIoT() {
    this.mqttClient.end();
    this.mqttClient = null;
  }
  connectIoT() {
    this.getAWSIdentity();
  }
  async getAWSIdentity() {
    AWS.config.region = this.awsRegion;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.awsCognitoPoolId
    });
    AWS.config.credentials.get(err => {
      if (err) {
        console.log(err)
      } else {
        if (AWS.config.credentials.data) {
          if (!this.mqttClient) {
            this.initMQTTClient(AWS.config.credentials.data.Credentials);
          } else {
            this.updateMQTTCredentials(AWS.config.credentials.data.Credentials);
          }
          this.subscribeTopic(AWSConfiguration.topicRegister);
        }
      }
    });
  }
  updateMQTTCredentials(credentials) {
    this.mqttClient.updateWebSocketCredentials(
      credentials.AccessKeyId,
      credentials.SecretKey,
      credentials.SessionToken,
      credentials.Expiration
    );
  }
  initMQTTClient(credentials) {
    this.clientId = this.getRandomClientId();
    this.mqttClient = AWSIoTData.device({
      // Set the AWS region we will operate in.
      region: this.awsRegion,
      // Set the AWS IoT Host Endpoint
      host: this.awsEndPoint,
      // Use the clientId created earlier.
      clientId: this.clientId,
      // Connect via secure WebSocket
      protocol: "wss",
      // Set the maximum reconnect time to 8 seconds; this is a browser application
      // so we don't want to leave the user waiting too long for reconnection after
      // re-connecting to the network/re-opening their laptop/etc...
      maximumReconnectTimeMs: 8000,
      // Enable console debugging information (optional)
      debug: true,
      // IMPORTANT: the AWS access key ID, secret key, and session token must be
      // initialized with empty strings.
      accessKeyId: credentials.AccessKeyId,
      secretKey: credentials.SecretKey,
      sessionToken: credentials.SessionToken,
      expiration: credentials.Expiration
    });
    this.mqttClient.on("connect", this.mqttClientConnectHandler);
    this.mqttClient.on("reconnect", this.mqttClientReconnectHandler);
    this.mqttClient.on("message", this.mqttClientMessageHandler);
    this.mqttClient.on("close", this.mqttClientCloseHandler);
    this.mqttClient.on("offline", this.mqttClientOfflineHandler);
    this.mqttClient.on("error", this.mqttClientErrorHandler);
    this.mqttClient.on("packetsend", this.mqttClientPacketSendHandler);
    this.mqttClient.on("packetreceive", this.mqttClientPacketReceiveHandler);
  }
  subscribeTopic(topicscr) {
    this.topic = topicscr
    if (this.topic) {
      this.mqttClient.subscribe(this.topic, null, (err, granted) => {
        if (!err) {
          console.log(granted);
        } else {
          console.error("subcribe error");
        }
      });
    } else {
      alert("Please input topic");
    }
  }
};
module.exports = Mqttdata

from flask import Flask, request, jsonify
from flask_cors import CORS
from web3 import Web3
from eth_account.messages import encode_defunct

app = Flask(__name__)
CORS(app)

w3 = Web3(Web3.HTTPProvider(
    "https://sepolia.infura.io/v3/<YOUR_INFURE_API>"))

pk = "YOUR PRIVATE KEY"
private_key = bytes.fromhex(pk.replace(" ", ""))
account = w3.eth.account.from_key(private_key)


@app.route('/sign', methods=['POST'])
def sign_message():
    data = request.json
    msg = data.get('message')
    print(msg)

    if msg is None:
        return jsonify({'error': 'Message parameter is missing'}), 400

    message = encode_defunct(text=msg)
    signed_message = w3.eth.account.sign_message(
        message, private_key=private_key)
    print(signed_message)
    signed_message = {
        "messageHash": signed_message.messageHash.hex(),
        "r": str(signed_message.r),
        "s": str(signed_message.s),
        "v": str(signed_message.v),
        "signature": signed_message.signature.hex()
    }
    print(signed_message)
    return jsonify(signed_message), 200


if __name__ == '__main__':
    app.run(debug=True)

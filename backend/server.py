from flask import Flask, request, jsonify
from flask_cors import CORS
from web3 import Web3
from eth_account.messages import encode_defunct

app = Flask(__name__)
CORS(app)

w3 = Web3(Web3.HTTPProvider(
    "https://sepolia.infura.io/v3/29e3a8fb21de47e3915cca2a8d875a84"))

pk = "8445feb1179fd23ab9112f5b37baafa94f66f42eb02acad4684379aa6ed7c0c7"
private_key = bytes.fromhex(pk.replace(" ", ""))
account = w3.eth.account.from_key(private_key)

@app.route('/sign', methods=['POST'])
def sign_message():
    data = request.json
    msg = data.get('message')
    
    if msg is None:
        return jsonify({'error': 'Message parameter is missing'}), 400

    message = encode_defunct(text=msg)
    signed_message = w3.eth.account.sign_message(message, private_key=private_key)
    return jsonify({"signature": signed_message.signature.hex()}), 200


if __name__ == '__main__':
    app.run(debug=True)

const { hdkey } = require('ethereumjs-wallet')
const bip39 = require('bip39')
const readline = require('readline');
let prefix = 'Cc'
let mnemonic, address, public, private;
 
function wallet(prefix) {
    do{
        mnemonic = bip39.generateMnemonic(128);
    
        const seed = bip39.mnemonicToSeedSync(mnemonic)
        const hdWallet = hdkey.fromMasterSeed(seed);
        var key = hdWallet.derivePath("m/44'/60'/0'/0/0");
        var wallet = key.getWallet()
        address = wallet.getAddressString()
        public =  wallet.getPublicKeyString()
        private =  wallet.getPrivateKeyString()
    


    }while(!address.startsWith('0x' + prefix))


    console.log("\n\nMnemonic: ", mnemonic)
    console.log("\nAddress: ", address)
    console.log("\nPublic Key: ",public)
    console.log("\nPrivate Key: ",private)
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the prefix: ', (prefix) => {
    prefix = prefix.toLowerCase(prefix);
    wallet(prefix);
    rl.close();
});



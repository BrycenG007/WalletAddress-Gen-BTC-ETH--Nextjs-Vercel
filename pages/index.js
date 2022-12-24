import * as bip39 from 'bip39';
import * as hdkey from 'hdkey';
import * as createHash from 'create-hash';
import * as bs58check from 'bs58check';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CSVLink } from 'react-csv'

const btcFileName = "BTCWallets";
const ethFileName = "ETHWallets";
const btcCsvData1 = [
  {
    "Wallet": "1GMjXM5G6p7grmY1ZtVQGc9UDMcAfmeAbj",
    "Mnemonic": "load lounge analyst before remain behind around music add puppy game belt",
    "PrivateKey": "543c5c69dc1cc5fa7fd21e9278dc451ca5460e2e0de7539b35dd3db0ef699e50",
    "PulicKey": "22161901895211057221420022659215180202137060321353625456135297495721116214690",
  },
  {
    "Wallet": "1GMjXM5G6p7grmY1ZtVQGc9UDMcAfmeAbj",
    "Mnemonic": "load lounge analyst before remain behind around music add puppy game belt",
    "PrivateKey": "543c5c69dc1cc5fa7fd21e9278dc451ca5460e2e0de7539b35dd3db0ef699e50",
    "PulicKey": "22161901895211057221420022659215180202137060321353625456135297495721116214690",
  },
  {
    "Wallet": "1GMjXM5G6p7grmY1ZtVQGc9UDMcAfmeAbj",
    "Mnemonic": "load lounge analyst before remain behind around music add puppy game belt",
    "PrivateKey": "543c5c69dc1cc5fa7fd21e9278dc451ca5460e2e0de7539b35dd3db0ef699e50",
    "PulicKey": "22161901895211057221420022659215180202137060321353625456135297495721116214690",
  }
]

export default function Home() {

  const [btcWallet, setBtcWallet] = useState();
  const [btcPrivateKey, setBtcPrivateKey] = useState();
  const [btcPublicKey, setBtcPublicKey] = useState();
  const [btcMnemonic, setBtcMnemonic] = useState();

  const [ethWallet, setEthWallet] = useState();
  const [ethPrivateKey, setEthPrivateKey] = useState();
  const [ethPublicKey, setEthPublicKey] = useState();
  const [ethMnemonic, setEthMnemonic] = useState();

  const [value, setValue] = useState();
  const [copied, setCopied] = useState(false);

  const [btcAmount, setBtcAmount] = useState(1);
  const [ethAmount, setEthAmount] = useState(1);

  const [btcCsvData, setBtcCsvData] = useState([]);
  const [ethCsvData, setEthCsvData] = useState([]);

  const bitcoinWallet = async () => {
    const mnemonic = bip39.generateMnemonic()
    //const mnemonic = "gentle mutual speak consider mandate kingdom cash explain soul exile cabin squeeze";
    setBtcMnemonic(mnemonic);
    const seed = await bip39.mnemonicToSeed(mnemonic); //creates seed buffer
    console.log('Seed: ' + seed);
    console.log('mnemonic: ' + mnemonic);

    const root = hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString('hex');
    setBtcPrivateKey(masterPrivateKey);
    console.log('masterPrivateKey: ' + masterPrivateKey);

    const addrnode = root.derive("m/44'/0'/0'/0/0");
    setBtcPublicKey(addrnode._publicKey)
    console.log('addrnodePublicKey: ' + addrnode._publicKey)

    const step1 = addrnode._publicKey;
    const step2 = createHash('sha256').update(step1).digest();
    const step3 = createHash('rmd160').update(step2).digest();

    var step4 = Buffer.allocUnsafe(21);
    step4.writeUInt8(0x00, 0);
    step3.copy(step4, 1); //step4 now holds the extended RIPMD-160 result
    const step9 = bs58check.encode(step4);
    setBtcWallet(step9);
    console.log('Base58Check: ' + step9);
  };

  const ethereumWallet = async () => {
    const ethers = require('ethers')
    const wallet = ethers.Wallet.createRandom()
    setEthWallet(wallet.address);
    setEthMnemonic(wallet.mnemonic.phrase);
    setEthPrivateKey(wallet.privateKey);
    setEthPublicKey(wallet.publicKey);
  }

  const btcExport = () => {
    
  }

  return (
    <section>
      <div className='flex flex-col gap-y-3 mx-10'>
        <h1 className='text-center font-bold text-2xl my-10'>Wallet Address Generator (BTC & ETH)</h1>
        <button onClick={bitcoinWallet} className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
          Generate Bitcoin Wallet Address
        </button>
        <div className='flex flex-col gap-y-3 justify-start items-start'>
          <span className='text-lg font-semibold'>Wallet:</span>
          <CopyToClipboard text={btcWallet}
            onCopy={() => { setCopied(true) }}>
            <span className='w-full break-words cursor-pointer'>{btcWallet}</span>
          </CopyToClipboard>
        </div>
        <div className='flex flex-col gap-y-3 justify-start items-start'>
          <span className='text-lg font-semibold'>Mnemonic:</span>
          <CopyToClipboard text={btcMnemonic}
            onCopy={() => { setCopied(true) }}>
            <span className='w-full break-words cursor-pointer'>{btcMnemonic}</span>
          </CopyToClipboard>
        </div>
        <div className='flex flex-col gap-y-3 justify-start items-start'>
          <span className='text-lg font-semibold'>PrivateKey:</span>
          <CopyToClipboard text={btcPrivateKey}
            onCopy={() => { setCopied(true) }}>
            <span className='w-full break-words cursor-pointer'>{btcPrivateKey}</span>
          </CopyToClipboard>
        </div>
        <div className='flex flex-col gap-y-3 justify-start items-start'>
          <span className='text-lg font-semibold'>PulicKey:</span>
          <CopyToClipboard text={btcPublicKey}
            onCopy={() => { setCopied(true) }}>
            <span className='w-full break-words cursor-pointer'>{btcPublicKey}</span>
          </CopyToClipboard>
        </div>
      </div>
      <div className='flex flex-col gap-y-3 mx-10 overflow-visible mt-10'>
        <button onClick={ethereumWallet} className=" px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
          Generate Ethereum Wallet Address
        </button>
        <div className='flex flex-col gap-y-3 justify-start items-start'>
          <span className='text-lg font-semibold'>Wallet:</span>
          <CopyToClipboard text={ethWallet}
            onCopy={() => { setCopied(true) }}>
            <span className='w-full break-words cursor-pointer'>{ethWallet}</span>
          </CopyToClipboard>
        </div>
        <div className='flex flex-col gap-y-3 justify-start items-start'>
          <span className='text-lg font-semibold'>Mnemonic:</span>
          <CopyToClipboard text={ethMnemonic}
            onCopy={() => { setCopied(true) }}>
            <span className='w-full break-words cursor-pointer'>{ethMnemonic}</span>
          </CopyToClipboard>
        </div>
        <div className='flex flex-col gap-y-3 justify-start items-start'>
          <span className='text-lg font-semibold'>PrivateKey:</span>
          <CopyToClipboard text={ethPrivateKey}
            onCopy={() => { setCopied(true) }}>
            <span className='w-full break-words cursor-pointer'>{ethPrivateKey}</span>
          </CopyToClipboard>
        </div>
        <div className='flex flex-col gap-y-3 justify-start items-start'>
          <span className='text-lg font-semibold'>PulicKey:</span>
          <CopyToClipboard text={ethPublicKey}
            onCopy={() => { setCopied(true) }}>
            <span className='w-full break-words cursor-pointer'>{ethPublicKey}</span>
          </CopyToClipboard>
        </div>
      </div>
      <div className='flex flex-wrap xm:flex-col gap-x-3 gap-y-10 mx-10 mt-10 justify-between items-center'>
        <div className='flex flex-col w-full gap-y-5 gap-x-3 justify-center items-center'>
          <span className='font-bold text-lg'>Bitcoin</span>
          <div className='flex gap-x-3'>
            <input className='px-4 py-1 md:py-2 md:text-lg md:px-5 xm:w-60 w-40 hover:border-black border-2 rounded-lg' placeholder='please input amount' type="number" min={1} max={500} value={btcAmount} onChange={e=>{setBtcAmount(e.target.value)}}/>
            <button className='px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-5'>
              <CSVLink data={btcCsvData} filename={btcFileName} onClick={btcExport}>Export</CSVLink>
            </button>
          </div>
        </div>
        <div className='flex flex-col w-full gap-y-5 gap-x-3 justify-center items-center'>
          <span className='font-bold text-lg'>Ethereum</span>
          <div className='flex gap-x-3'>
            <input className='px-4 py-1 md:py-2 md:text-lg md:px-5 xm:w-60 w-40 hover:border-black border-2 rounded-lg' placeholder='please input amount' type="number" min={1} max={500} value={ethAmount} onChange={e=>{setEthAmount(e.target.value)}}/>
            <button className='px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-5'>Export</button>
          </div>
        </div>
      </div>
    </section>
  )
}
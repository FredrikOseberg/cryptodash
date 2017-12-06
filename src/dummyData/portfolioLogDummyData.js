import bitcoin from '../img/coins/bitcoin.png';
import ethereum from '../img/coins/ether.png';
import litecoin from '../img/coins/litecoin.png';
import ardor from '../img/coins/ardor.png';

const data = [
	{
		type: 'add',
		coinName: 'Bitcoin',
		img: bitcoin,
		date: '02/12/2017',
		timestamp: 123,
		amount: 0.34
	},
	{
		type: 'add',
		coinName: 'Ethereum',
		img: ethereum,
		date: '20/10/2017',
		timestamp: 2323,
		amount: 4.32
	},
	{
		type: 'remove',
		coinName: 'Ethereum',
		img: ethereum,
		date: '30/10/2017',
		timestamp: 3444,
		amount: 2.0
	},
	{
		type: 'add',
		coinName: 'Litecoin',
		img: litecoin,
		date: '02/07/2017',
		timestamp: 4555,
		amount: 5.6
	},
	{
		type: 'add',
		coinName: 'Bitcoin',
		img: bitcoin,
		date: '01/07/2017',
		timestamp: 5666,
		amount: 0.34
	},
	{
		type: 'remove',
		coinName: 'Ardor',
		img: ardor,
		date: '01/07/2017',
		timestamp: 6123,
		amount: 1099
	},
	{
		type: 'remove',
		coinName: 'Bitcoin',
		img: bitcoin,
		date: '01/07/2017',
		timestamp: 7124,
		amount: 1.2
	},
	{
		type: 'remove',
		coinName: 'Litecoin',
		img: litecoin,
		date: '01/06/2017',
		timestamp: 81242,
		amount: 3.2
	},
	{
		type: 'add',
		coinName: 'Ardor',
		img: ardor,
		date: '29/05/2017',
		timestamp: 91241,
		amount: 1099
	}
];

export default data;

import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then((transactions)=> {
      setTransactions(transactions);
    })
  }, [name, datetime, description])

  async function getTransactions(){
    const url = process.env.REACT_APP_BACKEND_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(e){
    e.preventDefault();
    const url = process.env.REACT_APP_BACKEND_URL + '/transaction';
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.substring(price.length + 1),
        price: price,
        datetime: datetime,
        description: description
      })
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDatetime('');
        setDescription('');
        console.log('post response', json)
      })
    })
  }

  let balance = 0;
  transactions.forEach((transaction) => {
    balance += transaction.price;
  })

  


  return (
    <main>
      <h1 class={(balance < 0 ? 'red' : 'green')}>{balance < 0 ? '-' : '+'}Rs {balance}<span>/-</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className='baseic-info'> 
          <input type="text" 
            placeholder='+20000 Samsung Tv'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="datetime-local" 
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
        <div className='description'>
          <input type='text' 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder='description'
          />
        </div>
        <button type='submit'>Add new transaction</button>
      </form>
      <div className='transactions'>
        {transactions.map((transaction) => (
          <div className='transaction'>
            <div class="left">
              <div class="name">{transaction.name}</div>
              <div class="description">{transaction.description}</div>
            </div>
            <div class="right">
              <div class={"price" + (transaction.price > 0 ? ' green' : ' red')}>+ Rs {transaction.price} </div>
              <div class="datetime">{transaction.datetime}</div>
            </div>
          </div>
        ))}
        {/* <div className='transaction'>
          <div class="left">
            <div class="name">Freelance</div>
            <div class="description"> Built a new react website</div>
          </div>
          <div class="right">
            <div class="price green">+ Rs 40000 </div>
            <div class="datetime">2023-12-23 12:00</div>
          </div>
        </div>
        <div className='transaction'>
          <div class="left">
            <div class="name">Dresses Shopping</div>
            <div class="description">Got some jeans and tops</div>
          </div>
          <div class="right">
            <div class="price red"> -Rs 5000 </div>
            <div class="datetime">2023-12-25 15:20</div>
          </div>
        </div>

        <div className='transaction'>
          <div class="left">
            <div class="name">Headphones</div>
            <div class="description">Got new headphones</div>
          </div>
          <div class="right">
            <div class="price red"> -Rs 10000 </div>
            <div class="datetime">2023-12-30 19:40</div>
          </div>
        </div> */}

      </div>
    </main>
  );
}

export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./Coin";
import "./App.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authentication } from "./Firebase/firebase";
const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const signInWithFirebase = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => setLoggedIn(true))
      .catch((err) => setLoggedIn(false));
  };

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="container">
      {loggedIn ? (
        <div className="coin-app">
          <button
            className="btn"
            onClick={() => {
              setLoggedIn(false);
            }}
          >
            Log Out
          </button>
          <div className="coin-search">
            <h1 className="coin-text">Search a currency</h1>
            <form action="">
              <input
                type="text"
                placeholder="Search"
                className="coin-input"
                onChange={handleChange}
              />
            </form>
          </div>
          {filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                name={coin.name}
                image={coin.image}
                symbol={coin.symbol}
                marketCap={coin.market_cap}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                volume={coin.total_volume}
              />
            );
          })}
        </div>
      ) : (
        <button className="btn" onClick={signInWithFirebase}>
          Sign in with google
        </button>
      )}
    </div>
  );
};

export default App;

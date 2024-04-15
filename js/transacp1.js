const transactions = [
  {
    type: "recive",
    amount: "20200",
    description: "Shopee THR",
    date: "01-04-2027",
  },
  {
    type: "send",
    amount: "200200",
    description: "Hoetank teman",
    date: "01-04-2027",
  },
  {
    type: "recive",
    amount: "200200888",
    description: "Transfer",
    date: "01-04-2027",
  },
  {
    type: "recive",
    amount: "20200",
    description: "Shopee THR",
    date: "01-04-2027",
  },
  {
    type: "send",
    amount: "200200",
    description: "Hoetank teman",
    date: "01-04-2027",
  },
  {
    type: "recive",
    amount: "200200888",
    description: "Transfer",
    date: "01-04-2027",
  },
  {
    type: "recive",
    amount: "20200",
    description: "Shopee THR",
    date: "01-04-2027",
  },
  {
    type: "send",
    amount: "200200",
    description: "Hoetank teman",
    date: "01-04-2027",
  },
  {
    type: "recive",
    amount: "200200888",
    description: "Transfer",
    date: "01-04-2027",
  },
];

const fragment = document.createDocumentFragment();
let keys = JSON.parse(localStorage.getItem("generatedKeys"));

if (keys) {
  keys.forEach((key) => {
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-anakan");

    const img = document.createElement("img");
    img.src = `img/money-${transaction.type}-svgrepo-com.svg`;
    img.classList.add("imgduit");
    historyItem.appendChild(img);

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("infokan-kapan");

    const amount = document.createElement("div");
    amount.classList.add(
      `duit${transaction.type === "recive" ? "ijo" : "merah"}`
    );
    amount.textContent = `Rp. ${transaction.amount}`;
    infoContainer.appendChild(amount);

    const description = document.createElement("div");
    description.classList.add("buat-apah");
    description.textContent = transaction.description;
    infoContainer.appendChild(description);

    const date = document.createElement("div");
    date.classList.add("kapan");
    date.textContent = transaction.date;
    infoContainer.appendChild(date);

    historyItem.appendChild(infoContainer);
    fragment.appendChild(historyItem);
  });
}
transactions.forEach((transaction) => {
  const historyItem = document.createElement("div");
  historyItem.classList.add("history-anakan");

  const img = document.createElement("img");
  img.src = `img/money-${transaction.type}-svgrepo-com.svg`;
  img.classList.add("imgduit");
  historyItem.appendChild(img);

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("infokan-kapan");

  const amount = document.createElement("div");
  amount.classList.add(
    `duit${transaction.type === "recive" ? "ijo" : "merah"}`
  );
  amount.textContent = `Rp. ${transaction.amount}`;
  infoContainer.appendChild(amount);

  const description = document.createElement("div");
  description.classList.add("buat-apah");
  description.textContent = transaction.description;
  infoContainer.appendChild(description);

  const date = document.createElement("div");
  date.classList.add("kapan");
  date.textContent = transaction.date;
  infoContainer.appendChild(date);

  historyItem.appendChild(infoContainer);
  fragment.appendChild(historyItem);
});

const historyItems = document.getElementById("historyItems");
historyItems.appendChild(fragment);

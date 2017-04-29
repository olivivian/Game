//第一个变量 - randomNumber - 被分配一个1到100之间的随机数，使用数学算法计算。
var randomNumber = Math.floor(Math.random() * 100) + 1;
//这三个变量都用于存储对HTML中的结果段落的引用，并用于在代码的后面段落中插入值
var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');
//这两个变量存储对表单文本输入和提交按钮的引用，并用于控制以后提交猜测：
var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');
//最后两个变量存储一个猜测计数1（用于跟踪玩家有多少猜测），以及一个不存在的引用（但稍后会有）。
var guessCount = 1;
var resetButton;

function checkGuess(){
//声明一个名为userGuess的变量，并将其值设置为在文本字段中输入的当前值。 
//我们还通过内置的Number（）方法运行这个值，只是为了确保该值绝对是一个数字。
	 var userGuess = Number(guessField.value);
//是否这是玩家的第一次去	 
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
//将当前userGuess值附加到猜测段落的末尾，加上一个空格，因此在每个猜测之间将有一个空格。  
  guesses.textContent += userGuess + ' ';
 /*
  检查用户的猜测是否等于randomNumber在 JavaScript 顶端设置的值。
  如果是，则玩家猜对了，游戏胜利，
  那么，我们向玩家显示一个漂亮的绿色的祝贺信息，
  清除低/高猜测信息框的内容，并运行一个函数调用setgameover()方法。
  */
  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  }
/*
检查这个回合是否是用户最后一个回合。
如果是，程序回合前面一样，除了把祝贺信息换成一个game over信息。
 */
   else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();
  }
//如果玩家没有猜对，提示猜高还是猜低
   else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
}
/*
为guessSubmit按钮添加了一个监听事件。
这个方法 包含两个可输入值（参数），
监听事件的类型（在本例中为“点击”），
和当事件发生时我们想要执行的代码（在本例中为checkGuess（）函数）
注意，当函数作为事件监听方法的参数时，函数名后不应带括号。
 */
guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
/*
前两行禁用表单文本输入和按钮，方法是将其禁用属性设置为true。
 这是必要的，因为如果我们没有，用户可以提交更多的猜测，
 在游戏结束后，这会搞砸了。
 */
  guessField.disabled = true;
  guessSubmit.disabled = true;
  /*
  接下来的三行创建了一个新的button元素，
  设置它的文本信息为“开始新游戏”，并把它添加到我们文档的底部。
   */
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  /*
  最后一行在我们的新按钮上设置一个事件监听器，
  当它被点击时，一个名为resetGame（）的函数被运行。
   */
  resetButton.addEventListener('click', resetGame);
}
//重置一切
function resetGame() {
//将guessCount恢复为1。
  guessCount = 1;
//清除所有信息段落。
  var resetParas = document.querySelectorAll('.resultParas p');
  for (var i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }
//从我们的代码中删除重置按钮。
  resetButton.parentNode.removeChild(resetButton);
//启用表单元素，并清空和聚焦文本字段，准备输入新的猜测。
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
//从lastResult段中删除背景颜色。
  lastResult.style.backgroundColor = 'white';
//生成一个新的随机数，这样你不只是猜到相同的数字！
  randomNumber = Math.floor(Math.random() * 100) + 1;
}

















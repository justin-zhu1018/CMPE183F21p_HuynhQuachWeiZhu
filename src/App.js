import React, {Component} from 'react';
import Web3 from 'web3';
import { Input, Button } from 'reactstrap';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountConnected: false,
      account: '',
      network: '',
      items: [],
      text: '',
      todoList: '',
      taskCount: '',
      tasks: [],
      content: ''
    }
  }

  componentDidMount = () => {
    this.loadBlockchainData();
  }

  loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // for MetaMask
    const network = await web3.eth.net.getNetworkType(); // Network you're connected to
    const accounts = await web3.eth.getAccounts(); // Array of accounts
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);

    this.setState({network});
    this.setState({account: accounts[0] || 'Not connected'});
    this.setState({todoList});
    this.loadTaskList();
    if(accounts.length > 0) {
      this.setState({accountConnected: true});
    }

    console.log("network:", network);
    console.log("accounts:", accounts);
    console.log('todoList:', todoList);
  }

  loadTaskList = async () => {
    const taskCount = await this.state.todoList.methods.taskCount().call();
    console.log("Task Count:", taskCount);
    this.setState({taskCount});
    let tasks = [];
    for(let i = 1; i<=this.state.taskCount; i++){
      const task = await this.state.todoList.methods.tasks(i).call();
      tasks.push(task);
      this.setState({tasks});
    }
    console.log("Tasks:", tasks);
  }

  createTask = () => {
    if (this.state.accountConnected) {
      let content = this.state.content;
      console.log('Task Content:', content);
      this.state.todoList.methods.createTask(content).send({ from: this.state.account })
        .once('receipt', (receipt)=>{
          this.loadTaskList();
          this.setState({content: ''});
          console.log(receipt);
        });
    } else {
      console.log('Please connect your account to the app first!')
    }   
  }

  toggleCompleted = (taskId) => {
    if (this.state.accountConnected) {
      this.state.todoList.methods.toggleCompleted(taskId).send({ from: this.state.account })
        .once('receipt', (receipt) => {
          this.loadTaskList();
          console.log(receipt);
        });
    } else {
      console.log('Please connect your account to the app first!')
    }
  }

  updateContent = (e) => {
    console.log("Update Content:", e);
    this.setState({content: e});
  }

  render(){
    return (
      <div className="main-container">
        <div className="credentials">
          <p style={{fontWeight: 'bold'}}>Credentials</p>
          <p>Network: {this.state.network}</p>
          <p>Account: {this.state.account}</p>
        </div>
        <div className="tasks-list">
          <p style={{fontWeight: 'bold'}}>List of Tasks</p>
          { this.state.tasks.map((task, i) => {
                return(
                  <p
                    className={task.completed ? 'task completed': 'task'}
                    key={i}
                    onClick={()=> {
                      if(!task.completed){
                        this.toggleCompleted(task.id);
                      } else {
                        console.log('Task is already completed');
                      }
                    }}
                  >
                    {task.content}
                  </p>
                )
              })
          }
        </div>
        <div className="tasks-create">
          <div style={{textAlign: 'left'}}>
            <p style={{fontWeight: 'bold'}}>Create Task</p>
          </div>
          <Input
            value={this.state.content}
            onChange={(e) => this.updateContent(e.target.value)}
          />
          <div style={{margin: "10px"}} />
          <Button onClick={this.createTask}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

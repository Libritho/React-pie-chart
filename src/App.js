import React, { Component } from 'react';
import './App.css';
import PieChart from './pie-chart';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScreen: 'form', // or 'pie-chart'
      data: [], // [{name: 'string', value: number}]
      name: '',
      value: '',
    }
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    })
  };

  onValueChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onAddItem = () => {
    const { name, value } = this.state;
    if (!name || !value) {
     return alert('Заповнiть поля');
    }
    if (isNaN(value)) {
      return alert('Введiть правильне значення')
    }

    if (this.state.data.some((item) => {
      return item.name === name;
    })) {
      const currentData = [...this.state.data];
      for (let i = 0; i < currentData.length; i++) {
        if (currentData[i].name === name) {
          currentData[i].value = value;
        }
      }
      this.setState({
        data: currentData,
      });
      return alert(`Значення для ${name} змінено`)
    }

    this.setState({
      data: [...this.state.data, { name, value }]
    });
  };

  onRemoveItem = (name) => {
    const newData = [];
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].name !== name) {
        newData.push(this.state.data[i]);
      }
    }
    this.setState({
      data: newData,
    })
  };

  renderSidebar = () => {
    const { data } = this.state;
    return data.map((item, i) => {
      const { name, value } = item;
      return (
        <div
          key={`${i}-sidebar-item`}
          className={'SidebarItem'}
        >
          <div className={'Labels'}>
            {`${name}: ${value}`}
          </div>
          <button
            onClick={() => this.onRemoveItem(name)}
            className={'Delete'}>
            Remove
          </button>
        </div>
      )
    })
  };

    changeScreen = () => {
      if (!this.state.data.length) {
        return alert('Введiть даннi');
      }
        this.setState({
            currentScreen: this.state.currentScreen === 'form' ? 'pie-chart' : 'form',
        })
    };
  render() {
    const { currentScreen, data } = this.state;
    return (
      <div className={'Wrapper'}>
        <button
          onClick={this.changeScreen}
        >
          { currentScreen === 'form' ? 'Показати діаграму' : 'На початковий екран'}
        </button>
          { currentScreen === 'form' ?
              <div className={'App'}>
                <div className={'InputBlock'}>
                  <input
                    id={'nameInput'}
                    onInput={this.onNameChange}
                  />
                  <input
                    id={'valueInput'}
                    type={'number'}
                    onInput={this.onValueChange}
                  />
                  <button
                    onClick={this.onAddItem}
                    id={'AddItem'}>
                    Додати в список
                  </button>
                </div>
                <div className={'Sidebar'}>
                    {this.renderSidebar()}
                </div>
              </div> :
           <div className="diagram">
             <PieChart data={data} />
           </div>
          }
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react'
import {Button, Modal, Table, Form} from 'semantic-ui-react'

class DataTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tableData: [],
      open: false,
      selectedRow: null,
      tableData: [{
        "id": 1,
        "name": "Ibrahim Jabbar ..",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "quantity": 400,
        "price": 399
      },
      { 
        "id": 2,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Julianne.OConner@kory.org",
        "quantity": 7,
        "price": 467
     },
     { 
       "id": 3,
       "name": "Kurtis Weissnat",
       "username": "Bret",
       "email": "Nathan@yesenia.net",
       "quantity": 2,
       "price": 212
    },
    { 
      "id": 4,
      "name": "Nicholas Runolfsdottir V",
      "username": "Bret",
      "email": "Lucio_Hettinger@annie.ca",
      "quantity": 14,
      "price": 11
   },
   { 
     "id": 5,
     "name": "Glenna Reichert",
     "username": "Bret",
     "email": "Karley_Dach@jasper.info",
     "quantity": 344,
     "price": 45
  },
  { 
    "id": 6,
    "name": "Clementina DuBuque",
    "username": "Bret",
    "email": "Telly.Hoeger@billy.biz",
    "quantity": 12,
    "price": 90
 },
 { 
   "id": 7,
   "name": "Leanne Graham",
   "username": "Bret",
   "email": "Sherwood@rosamond.me",
   "quantity": 20,
   "price": 102
}
    ]
    };
    this.show = this.show.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.saveTableData = this.saveTableData.bind(this);
    this.close = this.close.bind(this);
    // this.getSum = this.getSum.bind(this);

    
  };

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/users')     
    //   .then(response => response.json())
    //   .then(data => this.setState({tableData: this.state.newData}));
  }

  show(index) {
    const {
      tableData
    } = this.state;
    const selectedRow = tableData[index];
    console.log('selectedRow: ', selectedRow);
    this.setState({open: true, selectedRow: JSON.parse(JSON.stringify(selectedRow))})
  }

  onChangeHandler(key, value) {
    const course = this.state.selectedRow
    course[key] = value;
    this.setState({selectedRow: course})
  }
  saveTableData(event){
    debugger;
    event.preventDefault();
    const {selectedRow} = this.state
    console.log(selectedRow);
    const processedData = JSON.stringify(selectedRow)
    fetch('http://localhost:3000/profile', {
      method: 'POST',
      body: processedData,
    })
  }
  close() {
    this.setState({open: false});
  }

  render() {
    const that = this;
    const {open, tableData, selectedRow} = this.state;
    let t_quantity = 0;
    let t_price = 0;
    const tableBodyData = tableData.map((tablebody, index) => {
      t_quantity += tablebody.quantity;
      t_price += tablebody.price;
      return (
        <Table.Row key={index}>
          <Table.Cell>{tablebody.name}</Table.Cell>
          <Table.Cell>{tablebody.username}</Table.Cell>
          <Table.Cell>{tablebody.email}</Table.Cell>
          <Table.Cell>{tablebody.quantity}</Table.Cell>
          <Table.Cell>{tablebody.price}</Table.Cell>
          <Table.Cell><Button onClick={() => {
            this.show(index);
          }}>update</Button></Table.Cell>
        </Table.Row>
      )
    });
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tableBodyData}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Total Quantity: {t_quantity}</Table.HeaderCell>
              <Table.HeaderCell>Total Price: {t_price}</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <Modal open={open} onClose={this.close}>
          <Modal.Header>Update Data</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Code</label>
                <input placeholder='Code'
                       onChange={function (event) {
                         that.onChangeHandler('name', event.target.value);
                       }}

                       value={selectedRow ? selectedRow.name : ''}/>
              </Form.Field>
              <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' onChange={function (event) {
                  that.onChangeHandler('username', event.target.value);
                }}
                       value={selectedRow ? selectedRow.username : ''}

                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input placeholder='First Name' onChange={function (event) {
                  that.onChangeHandler('email', event.target.value);
                }}
                       value={selectedRow ? selectedRow.email : ''}/>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>No</Button>
            <Button positive onClick={this.saveTableData} icon='checkmark' labelPosition='right' content='Yes'/>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default DataTable;

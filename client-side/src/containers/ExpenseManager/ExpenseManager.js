import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Grid, Menu, Button } from 'semantic-ui-react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import InputControllers from '../../components/InputControllers/InputControllers';
// import ListControllers from '../../components/ListControllers/ListControllers';
import classes from './ExpenseManager.css';
// import Card from '../../components/card/card';
import AccordionList from './../../components/Accordion/Accordion';
import ShowMonthList from '../../components/ShowMonthList/ShowMonthList';
import { Divider } from 'semantic-ui-react';

class ExpenseManager extends Component {
    constructor(props) {
        super(props);
        // const date = new Date(),
        // today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        this.state = {
            itemList: {
                item: 'Biryani',
                price: '80',
            },
            // date: moment(),
            allList: [],
            activeItem: 'dashboard',
            amount: 0,
            editList: false,    editVal : null,
            tmpItems :[], 
            // activeIndex: 0,
            dateListItems: [],
            monthlyExp: [],     yearlyExp : 0,
            listdate : 0, user : '' , id: this.props.match.params.id, // 112239157622742530000
            showEdit: false, userName: ''
        }
    };

    /*  IT calls After render() */
    componentDidMount() {
        this.getUserData();
    }
    callOtherMethodHandler = () => {
        this.itemListHandler();
        this.showMonthPriceHandler();
        this.showYearPriceHandler();
        this.dateWiseItemHandler();
    }
    getUserData= () => {
        const token = 'JWT '+localStorage.getItem('token');
        axios.get('/auth/user', {
            params : {  id: this.state.id },
            headers : { token : token }
            })
            .then(res => {
                // console.log('this', this.state)
                // console.log('auth user', res)
                if(Object.keys(res.data)[0] === 'google')
                {   console.log('google ',res.data)
                    this.setState({user : res.data.google.gid, userName: res.data.google.name})
                    this.callOtherMethodHandler();
                }else if(Object.keys(res.data)[0] === 'facebook')
                {   console.log('facebook ', res.data)
                    this.setState({user : res.data.facebook.fbid, userName: res.data.facebook.name})
                    this.callOtherMethodHandler();
                }else if(Object.keys(res.data)[0] === 'local'){
                    console.log('local ', res.data)
                    this.setState({user : res.data.local.lid, userName: res.data.local.name})
                    this.callOtherMethodHandler();
                }
            }).catch(err => {
                console.log(err)
                alert(err.message)
                this.props.history.push('/');
            })
    }

    /* To handle the side Tab click */
    handleItemClick = (e, {name}) => { this.setState({ activeItem: name})}

    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        console.log('title props,', titleProps);
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex : newIndex})
    }

    /*  For input change in Addition of Item */
    InputHandler = (event) => {
        // console.log('Event AddInputHandler: ', event.target);
        const value = event.target.value;
        const name = event.target.name;
        const list = { ...this.state.itemList };
        list[name] = value;
        this.setState({ itemList: list  });
    };
    /*  It empty the adding input Items */
    emptyInput(list) {
        list.item = '';
        list.price = '';
        this.setState({ itemList: list });
    }
    // clearItemHandler = () => {
    //     this.setState({ allList: [] });
    // };
    /*  It save the Item to DB  */
    saveItemsHandler = () => {
        let list = { ...this.state.itemList };
        const userId = this.state.user
        // console.log('id',userId)
        // const date = { ...this.state.date };
        // const ress = this.state.allList.slice();
        const ress = this.state.dateListItems.slice();
        const saveItem = {
            uid : userId,
            item: list.item,
            price: list.price,
            date : moment().format('YYYY-MM-DD')
            // date: moment().toISOString(),
            // created_date: moment().format()
            
            // items: [{
            //     name: list.items,
            //     price: list.price
            // }]
        }
        // console.log('saveItem', saveItem);
        const headers = { 
            'Authorization' :  'JWT '+localStorage.getItem('token') ,
            // 'X-Requested-With': 'XMLHttpRequest'
        }
        axios.post('/addItems',saveItem,{
                headers: headers
            })
            .then(res => {
                return res;
            }).then(result => {
                console.log('add Items: ',result);
                ress.push(
                    result.data
                )
            // this.setState({ allList: ress, itemList:list})
            this.setState({ dateListItems: ress, itemList: list})
            this.itemListHandler();
            this.dateWiseItemHandler();
            this.totalPriceHandler();
            this.emptyInput(list);
        })
        .catch(err => {
            console.log('errr',err)
            alert(err.message)
            this.props.history.push('/');
        });
        
    };
    /*  It delete the item from DB  */
    deleteItemHandler= (event)=> {
        const del = event.target.id;
        // console.log('delete id: ',del);
        axios.delete('/deleteItems',{
            params: { id: del}
        })
        .then(res => {
            if(res.status === 200){
                // this.totalPriceHandler();
                this.itemListHandler();
                this.dateWiseItemHandler();
                // console.log('Item Deleted: ',res);
            }
        })
        .catch(err => { return console.error('Error: ',err); });
    };
    /*  It list the all Items from DB   */
    itemListHandler= () => {
        const userId = this.state.user
        axios.get('/itemList', {
            params: {   uid: userId  }
        })
        .then(res => {
            // console.log('Total Items List: ',res)
            const fetchLists = [];
            for (let key in res.data) {
                fetchLists.push({
                    ...res.data[key],
                    id: key
                });
            }
            // this.dateWiseItemHandler();
            this.setState({allList: fetchLists});
            this.totalPriceHandler();
            // console.log('ItemList data,' ,this.state.allList)
            // console.log('all',fetchLists);
        })
        .catch(err => { return console.error('Error: ',err); });
        
    };
    /*  It call the total Price of the Items    */
    totalPriceHandler = () => {
        // console.log('total Price handler: ')
        const userId = this.state.user;
        axios('/totalPrice', {
            params : { uid : userId}
        })
            .then(total => {
                if(total.data[0] !== undefined){
                    const getTotalPrice = total.data[0].totalSum
                    // console.log('Total: ', getTotalPrice);
                    this.setState({ amount : getTotalPrice})
                    this.showMonthPriceHandler();
                } else {
                    this.setState({amount : 0})
                }
            })
    };
    /*  For updating the items  */
    inputItemHandler = (event) => {
        // console.log('event inputItem: ', event.target)
        const value = event.target.value;
        const _id = event.target.id;
        const name = event.target.name;
        // console.log('id, name, value ',_id, name, value)
        // const list = this.state.allList.slice();
        const listt = this.state.dateListItems.slice();
        // const list = listt;
        // console.log('list',listt);
        // const list = this.state.date
        // ******* For Card List **************************
        for(let aa in listt){
            for(let bb in listt[aa].items ){
                const cc = listt[aa].items[bb];
                if(cc._id === _id){
                    if(name === 'item'){
                        // console.log('cc: ',bb,cc._id,cc.item,cc.price)
                        cc.item = value;
                    } else if (name === 'price'){
                        // console.log('cc: ',bb,cc._id,cc.item,cc.price)
                        cc.price = value
                    }
                this.setState({ tmpItems: cc, editList: true, editVal: _id})
                }
                // console.log('bb _id',bb, listt[aa].items[bb]._id)
            }
        }
    }
    /*  It update the Item from DB  */
    updateAllHandler =(event) => {
        // console.log('event Update', event.target)
        const _id = event.target.id;
        const tmpItems = {...this.state.tmpItems};
        // console.log('tmpItems:', tmpItems)
        axios.put('/updateItems/'+_id,{
            data: {
                item: tmpItems.item,
                price: tmpItems.price,
                // updated_date: moment().format()
            }
        })
        .then( res => {
            this.totalPriceHandler();
            this.dateWiseItemHandler();
            // console.log('Updated Item: ',res);
        })
        this.setState({ editList: false, editVal: null})
    };

    dateWiseItemHandler = () => {
        // console.log('date ITem List: ');
        const userId = this.state.user;
        // console.log('id', userId)
        axios.get('/itemList/date', {
            params : {  uid : userId}
        })
        .then(res => {
            // console.log('date res: ',res.data)
            const dateList = [];
            for( let i in res.data){
                dateList.push({
                    ...res.data[i]
                })
            }
            this.setState({ dateListItems: dateList})
            this.totalPriceHandler();
            // console.log('dateList',this.state.dateListItems)
        })
    }

    showMonthPriceHandler = () => {
        const userId = this.state.user;
        axios.get('/monthlyExp', {
            params: { uid : userId }
        })
        .then(res => {
            this.setState({ monthlyExp: res.data, listdate : 1})
            // console.log('monthly Exp: ', this.state.monthlyExp)
        })
    }
    showYearPriceHandler = () => {
        const userId = this.state.user;
        axios.get('/yearlyExp', {
            params: {   uid : userId}
        }).then( res => {
            this.setState({ yearlyExp : res.data, listdate: 1})
            // console.log('yearly exp: ', this.state.yearlyExp);            
        })
    }
    logoutHandler = (response) => {
        // console.log(localStorage.getItem('token'))
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        console.log('local token data', localStorage.getItem('token'));
        axios.get('/auth/logout')
            .then(res => {
                console.log('logout ho gye bhaiya',res)
                this.props.history.push('/');
            })
    }
    render() {
        const isSessionActive = localStorage.getItem('token')
        // console.log('localstorage',localStorage.getItem('token'));
        // console.log('expense session', isSessionActive);
        if(isSessionActive === null){
            this.props.history.push('/');
        }
        const {activeItem} = this.state;
        // const panels = [
        //  {  title: 'Date', content: ['Hot date'].join(' ') },
        //  {  title: 'Time', content: ['Hot Time'].join(' ')  }
        // ]
        return (
            <Aux>
                <div className={classes.ExpenseControl}>
                <Grid container relaxed>
                {/* <Grid.Row columns={3}> */}
                    <Grid.Column width={3}> 
                    <h2 style={style}>{this.state.userName}</h2>
                    <Menu  fluid pointing secondary vertical>
                        <Menu.Item as={Link} to="#" name="dashboard" 
                            active={activeItem === 'dashboard'} 
                            onClick={this.handleItemClick}>
                        </Menu.Item>
                        {/* <Menu.Item as={Link} to='/allitems' name='allitems' 
                            active={activeItem === 'allitems'} 
                            onClick={this.handleItemClick} >
                        </Menu.Item> */}
                        <Button primary onClick={this.logoutHandler} >Logout</Button>
                    </Menu>
                    </Grid.Column>
                    <Grid.Column width={10}> 
                        <InputControllers
                            // today={this.state.date}
                            // inputDate={this.InputDate}
                            itemList={this.state.itemList}
                            inputChanged={this.InputHandler}
                            saveItem={this.saveItemsHandler}
                            totalPrice = {this.state.amount}
                            // clearItem={this.clearItemHandler}
                        /> 
                        { this.state.dateListItems ? <AccordionList 
                            dateList = {this.state.dateListItems}
                            deleteItem={this.deleteItemHandler}
                            updateItem = {this.updateAllHandler}
                            isEdit = {this.state.editList}
                            editVal = {this.state.editVal}
                            changedInput={this.inputItemHandler}
                            showEdit = {true}                            
                        /> : null }
                        <Divider hidden />
                        <AccordionList 
                            listdate = {this.state.listdate}                        
                            dateList = {this.state.monthlyExp}
                            deleteItem={this.deleteItemHandler}
                            updateItem = {this.updateAllHandler}
                            isEdit = {this.state.editList}
                            editVal = {this.state.editVal}
                            changedInput={this.inputItemHandler}
                            showEdit = {this.state.showEdit}
                        />
                        <Divider hidden />
                        {/* <div>
                            <Card
                                all = {this.state.allList}
                                deleteItem={this.deleteItemHandler}
                                updateItem = {this.updateAllHandler}
                                isEdit = {this.state.editList}
                                editVal = {this.state.editVal}
                                changedInput={this.inputItemHandler}
                            /> 
                        </div> */}
                    </Grid.Column>
                        <ShowMonthList 
                            list = {this.state.monthlyExp}
                        />
                    <Grid.Column width={3}> 
                    </Grid.Column>
                {/* </Grid.Row> */}
                </Grid>   
                </div>             
            </Aux>
        );
    }
}
const style = {
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'serif',
    color: 'chocolate'
}
export default ExpenseManager;
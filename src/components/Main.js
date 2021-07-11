import React,{Component} from 'react';
import Home from './Home';
import Menu from './Menu';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import DishDetailed from './DishDetailed';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import Header from './Header';
import Footer from './Footer';
import {Switch,Route,Redirect} from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      comments:COMMENTS,
      leaders:LEADERS,
      promotions:PROMOTIONS,
      selectedDish:null
        }
  }

  render(){
//another way of passing props another at line 34
    const HomePage=()=>{
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leaders={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    const DishWithId=({match})=>{  //match location and history are coming as props
      return(
        <DishDetailed dish={this.state.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
        comment={this.state.comments.filter((comments)=> comments.dishId===parseInt(match.params.dishId,10))}
        />
      )
    }

  return (
    <div >
      <Header/>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} comment={this.state.comments}/>}/> 
        <Route path="/menu/:dishId" component={DishWithId}/>
        <Route path="/aboutus" component={() => <AboutUs leaders={this.state.leaders}/>} />
        <Route path="/contactus" component={ContactUs}/>
        <Redirect to="/home" />
      </Switch>
      <Footer/>
    </div>
  );
  }
}

export default Main;
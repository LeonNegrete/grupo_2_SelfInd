import React from 'react';
import image from '../assets/images/logo.png';
import ContentWrapper from './ContentWrapper';
import Chart from './Chart'
import NotFound from './NotFound';
import { Link, Route, Switch } from 'react-router-dom';
import SearchProduct from './SearchProduct';

function    SideBar() {
    return (
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="p-0 navbar-md bg-white sidebar accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                
                <a className="sidebar-brand border-end" href="/">
                    <div className="ms-n40 sidebar-brand-icon d-flex align-items-center justify-content-center  ">
                        <img className="w-25 "  src={image} alt="Self Ind" />
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="divider my-0" />

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - Self Ind</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider border-dark" />

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading text-dark">Menu</div>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/table">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Product table</span></Link>
                </li>

                {/*<!-- Buscador -->*/}
                <li className="nav-item">
                    <a className='nav-link' href='http://localhost:3030/products/create'>
                    <i class="fas fa-layer-plus fa-fw"></i>
                        <span>Create new product</span>
                    </a>
                    
                </li>  

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block border-dark" />
            </ul>
            {/*<!-- End of Sidebar -->*/}

            {/*<!-- Microdesafio 1 -->*/}
            {/*<!--<Route exact path="/">
                <ContentWrapper />
            </Route>
            <Route path="/GenresInDb">
                <GenresInDb />
            </Route>
            <Route path="/LastMovieInDb">
                <LastMovieInDb />
            </Route>
            <Route path="/ContentRowMovies">
                <ContentRowMovies />
            </Route>*/}
            {/*<!-- End Microdesafio 1 -->*/}

            {/*<!-- End Microdesafio 2 -->*/}
            <Switch>
                <Route exact path="/">
                    <ContentWrapper />
                </Route>
                <Route path="/SearchProduct">
                    <SearchProduct />
                </Route>
                <Route path="/table">
                    <Chart/>
                </Route>
                <Route component={NotFound} ></Route>
            </Switch>
            {/*<!-- End Microdesafio 2 -->*/}
        </React.Fragment>
    )
}
export default SideBar;
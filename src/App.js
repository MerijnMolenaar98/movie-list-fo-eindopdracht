import './App.css';
import {Switch, Route, Redirect} from "react-router-dom";
import BottomMenu from "./components/BottomMenu/BottomMenu";
import SearchPage from "./pages/SearchPage/SearchPage";
import ListPage from "./pages/ListPage/ListPage";
import RatingPage from "./pages/RatingPage/RatingPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import FollowPage from "./pages/FollowPage/FollowPage";
import UserSearchPage from "./pages/UserSearchPage/UserSearchPage";

function App() {
    let user = sessionStorage.getItem('user');
    return (
        <main>
            <Switch>
                <Route exact path="/">
                    {user ?  <Redirect to="/search" /> : <LoginPage />}
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                {
                    user ?
                    <Route path="/search">
                        <SearchPage/>
                    </Route>
                    : ''
                }
                {
                    user ?
                        <Route path="/follow">
                            <FollowPage />
                        </Route>
                        : ''
                }
                {
                    user ?
                        <Route path="/movie/:id">
                            <FollowPage />
                        </Route>
                        : ''
                }
                {
                    user ?
                        <Route path="/user-search">
                            <UserSearchPage />
                        </Route>
                        : ''
                }
                {
                    user ?
                        <Route path="/list">
                            <ListPage/>
                        </Route>
                        : ''
                }

                {
                    user ?
                        <Route path="/rating">
                            <RatingPage/>
                        </Route>
                        : ''
                }
                {
                    user ?
                        <Route path="/account">
                            <AccountPage/>
                        </Route>
                        : ''
                }
            </Switch>
            {user ? <BottomMenu/> : ''}
        </main>
    );
}

export default App;

import './App.css';
import {Switch, Route} from "react-router-dom";
import BottomMenu from "./components/BottomMenu/BottomMenu";
import SearchPage from "./pages/SearchPage/SearchPage";
import ListPage from "./pages/ListPage/ListPage";
import RatingPage from "./pages/RatingPage/RatingPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import FollowPage from "./pages/FollowPage/FollowPage";
import UserSearchPage from "./pages/UserSearchPage/UserSearchPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <Route path="/search">
                    <ProtectedRoute>
                        <SearchPage/>
                        <BottomMenu />
                    </ProtectedRoute>
                </Route>
                <Route path="/follow">
                    <ProtectedRoute>
                        <FollowPage />
                    </ProtectedRoute>
                </Route>
                <Route path="/movie/:id">
                    <ProtectedRoute>
                        <MoviePage />
                    </ProtectedRoute>
                </Route>
                <Route path="/user-search">
                    <ProtectedRoute>
                        <UserSearchPage />
                    </ProtectedRoute>
                </Route>
                <Route path="/list">
                    <ProtectedRoute>
                        <ListPage/>
                        <BottomMenu />
                    </ProtectedRoute>
                </Route>
                <Route path="/rating">
                    <ProtectedRoute>
                        <RatingPage/>
                        <BottomMenu />
                    </ProtectedRoute>
                </Route>
                <Route path="/account">
                    <ProtectedRoute>
                        <AccountPage/>
                        <BottomMenu />
                    </ProtectedRoute>
                </Route>
            </Switch>
        </main>
    );
}

export default App;

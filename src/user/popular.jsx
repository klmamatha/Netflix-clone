// File: UserHome.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "./UserNav";
import "font-awesome/css/font-awesome.min.css";

const Popular = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        genre: "",
        yearRange: "",
        language: "",
        country: "",
        rating: "",
    });
    const [favmovies, setFavorites] = useState({});

    // Fetch movies and load favorites from localStorage
    useEffect(() => {
        fetch("http://localhost:1234/movies1")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                setFilteredMovies(data);
            })
            .catch((error) => console.error("Error fetching movies:", error));

        const savedFavorites = JSON.parse(localStorage.getItem("favmovies")) || {};
        setFavorites(savedFavorites);
    }, []);

    // Update filtered movies based on filters and search term
    useEffect(() => {
        const applyFilters = () => {
            const filtered = movies.filter((movie) => {
                const matchesSearch = searchTerm
                    ? Object.values(movie).some((value) =>
                        String(value).toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    : true;

                const matchesGenre = filters.genre ? movie.Genre.includes(filters.genre) : true;
                const matchesYearRange = filters.yearRange ? checkYearRange(movie.Year) : true;
                const matchesLanguage = filters.language ? movie.Language.includes(filters.language) : true;
                const matchesCountry = filters.country ? movie.Country.includes(filters.country) : true;
                const matchesRating = filters.rating
                    ? parseFloat(movie.imdbRating) >= parseFloat(filters.rating)
                    : true;

                return (
                    matchesSearch &&
                    matchesGenre &&
                    matchesYearRange &&
                    matchesLanguage &&
                    matchesCountry &&
                    matchesRating
                );
            });
            setFilteredMovies(filtered);
        };

        applyFilters();
    }, [filters, searchTerm, movies]);

    const checkYearRange = (year) => {
        const yearNum = parseInt(year, 10);
        switch (filters.yearRange) {
            case "1900-2000":
                return yearNum >= 1900 && yearNum <= 2000;
            case "2000-2010":
                return yearNum >= 2000 && yearNum <= 2010;
            case "2010-2020":
                return yearNum >= 2010 && yearNum <= 2020;
            case "2020-present":
                return yearNum >= 2020;
            default:
                return true;
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const toggleFavorite = async (movieId) => {
        const newFavorites = { ...favmovies };

        if (newFavorites[movieId]) {
            delete newFavorites[movieId]; // Remove from favorites
            try {
                await fetch(`http://localhost:1234/favmovies/${movieId}`, {
                    method: "DELETE",
                });
            } catch (error) {
                console.error("Error removing favorite movie:", error);
            }
        } else {
            newFavorites[movieId] = true; // Add to favorites
            try {
                await fetch("http://localhost:1234/favmovies", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ movieId }),
                });
            } catch (error) {
                console.error("Error adding favorite movie:", error);
            }
        }

        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };

    const goToProfilePage = () => {
        navigate("/profile");
    };

    const favoriteMovies = Object.keys(favmovies).map((movieId) =>
        movies.find((movie) => movie.id === parseInt(movieId))
    );

    return (
        <div>
            <UserNav
                favoriteCount={favoriteMovies.length}
                goToProfile={goToProfilePage}
                onSearchChange={(term) => setSearchTerm(term)}
            />

            <div style={{ backgroundColor: "#2d1a44", minHeight: "100vh", color: "#fff" }}>
                {/* Filters */}
                <div className="container py-4 bg-black">
                    <div className="row g-2 d-flex align-items-center justify-content-between">
                        <div className="col-auto flex-grow-1">
                            <select
                                className="form-select text-primary bg-transparent"
                                onChange={(e) => handleFilterChange("yearRange", e.target.value)}
                            >
                                <option value="">Select Year Range</option>
                                <option value="1900-2000">1900-2000</option>
                                <option value="2000-2010">2000-2010</option>
                                <option value="2010-2020">2010-2020</option>
                                <option value="2020-present">2020-Present</option>
                            </select>
                        </div>

                        <div className="col-auto flex-grow-1">
                            <select
                                className="form-select text-primary bg-transparent"
                                onChange={(e) => handleFilterChange("genre", e.target.value)}
                            >
                                <option value="">Select Genre</option>
                                <option value="Action">Action</option>
                                <option value="Drama">Drama</option>
                                <option value="Comedy">Comedy</option>
                            </select>
                        </div>

                        <div className="col-auto flex-grow-1">
                            <select
                                className="form-select text-primary bg-transparent"
                                onChange={(e) => handleFilterChange("language", e.target.value)}
                            >
                                <option value="">Select Language</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="French">French</option>
                            </select>
                        </div>

                        <div className="col-auto flex-grow-1">
                            <select
                                className="form-select text-primary bg-transparent"
                                onChange={(e) => handleFilterChange("country", e.target.value)}
                            >
                                <option value="">Select Country</option>
                                <option value="USA">USA</option>
                                <option value="India">India</option>
                                <option value="UK">UK</option>
                            </select>
                        </div>

                        <div className="col-auto flex-grow-1">
                            <select
                                className="form-select text-primary bg-transparent"
                                onChange={(e) => handleFilterChange("rating", e.target.value)}
                            >
                                <option value="">Select Rating</option>
                                <option value="7">7+</option>
                                <option value="8">8+</option>
                                <option value="9">9+</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Total Items Found */}
                <div className="col-12 mb-2 text-warning text-center pt-4">
                    <h5>Total {filteredMovies.length} items found</h5>
                </div>

                {/* All Movies */}
                <div className="container py-4">
                    <div className="row">
                        {filteredMovies.map((movie) => (
                            <div
                                key={movie.id}
                                className="col-3 mb-4 transform transition duration-300 hover:scale-95"
                            >
                                <div className="card position-relative bg-transparent hover:scale-95">
                                    <img
                                        src={movie.Poster}
                                        className="card-img-top rounded-lg"
                                        alt={movie.Title}
                                    />
                                    <div className="position-absolute top-0 end-0 m-3">
                                        <button
                                            className={`btn btn-link p-0 ${favmovies[movie.id] ? "text-danger" : "text-white"
                                                }`}
                                            onClick={() => toggleFavorite(movie.id)}
                                        >
                                            <i
                                                className={`fa fa-heart fa-3x ${favmovies[movie.id] ? "text-danger" : ""
                                                    }`}
                                            ></i>
                                        </button>
                                    </div>
                                    <div className="card-body bg-transparent text-warning">
                                        <h5 className="card-title">{movie.Title}</h5>
                                        <p className="card-text">{movie.Year}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Popular;

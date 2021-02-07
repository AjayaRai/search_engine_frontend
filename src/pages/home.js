import React, {Component} from 'react';
import axios from 'axios';
import {breakdownUsrQuery} from "../functions/functions";

class Home extends Component {
    componentDidMount() {
        let userQuery = "Irish man gets assaulted. Then police appears";

        let analyzeQuery = {
            analyzer: "english",
            text: userQuery
        }

        axios
            .get('/movies_index/_analyze', {
                params: {
                    source: JSON.stringify(analyzeQuery),
                    source_content_type: 'application/json'
                }
            })
            .then((res) => {
                console.log(res.data);

                let userTokenArr = res.data.tokens;


                console.log("user", userTokenArr);

                let query = {
                    query: {
                        match_all: {}
                    },
                    from: 0,
                    size: 1000
                };

                axios
                    .get(`/movies_index/_search`, {
                        params: {
                            source: JSON.stringify(query),
                            source_content_type: 'application/json'
                        }
                    })
                    .then((res) => {

                        let arrOfMovies = res.data.hits.hits;

                        for (let i=0; i< 1; i++) {
                            let aPlot = arrOfMovies[i]._source.Plot;

                            let analyzeQuery = {
                                analyzer: "english",
                                text: aPlot
                            }

                            axios
                                .get('/movies_index/_analyze', {
                                    params: {
                                        source: JSON.stringify(analyzeQuery),
                                        source_content_type: 'application/json'
                                    }
                                })
                                .then((res) => {
                                    console.log("plots token", res.data);

                                    let plotTokensArr = res.data.tokens;

                                    let usrQueryBinary = []; // user input is turned into 0s or 1s

                                    for (let i2 =0; i2 < userTokenArr.length; i2++){
                                        let aUsrToken = userTokenArr[i2].token;

                                        usrQueryBinary[i2] = 0;

                                        for (let i3=0; i3 < plotTokensArr.length; i3++) {
                                            let aPlotToken = plotTokensArr[i3].token;
                                            if (aUsrToken === aPlotToken) {
                                                console.log(aUsrToken);
                                                usrQueryBinary[i2] = 1;
                                            }
                                        }
                                    }

                                    console.log("usrQueryBinary", usrQueryBinary);
                                }).catch((err) => {
                                console.error(err);
                            })
                        }
                    }).catch((err) => {
                        console.error(err);
                })

            }).catch((err) => {
            console.error(err);
        })
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

export default Home;
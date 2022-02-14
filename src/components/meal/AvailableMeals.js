import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useHttp from "../../hooks/use-http";
import Card from "../ui/Card";
import MealItem from "./meal-item/MealItem";

const LoadingSection = styled.section`
    color: white;
    text-align: center;
    font-size: 2rem;
    padding: 2rem;
`;

const ErrorSection = styled.section`
    color: red;
    text-align: center;
    font-size: 2rem;
    padding: 2rem;
`;

const MealSection = styled.section`
    max-width: 60rem;
    width: 90%;
    margin: 2rem auto;
    animation: meals-appear 1s ease-out forwards;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    @keyframes meals-appear {
        from {
            opacity: 0;
            transform: translateY(3rem);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const { isLoading, error, sendRequest: fetchMeals } = useHttp();

    useEffect(() => {
        const loadData = (data) => {
            let loadedMeals = [];
            for (const id in data) {
                loadedMeals.push({
                    id,
                    name: data[id].name,
                    description: data[id].description,
                    price: data[id].price,
                });
            }
            setMeals(loadedMeals);
        };

        fetchMeals(
            {
                url: "https://test-e9746-default-rtdb.firebaseio.com/meals.json",
            },
            loadData
        );
    }, [fetchMeals]);
    // fetchMeals (sendRequest) is wrapped in a useCallback,
    // so it will not change in the future

    if (isLoading)
        return (
            <LoadingSection>
                <p>Loading...</p>
            </LoadingSection>
        );

    if (error)
        return (
            <ErrorSection>
                <p>{error}</p>
            </ErrorSection>
        );

    const mealList = meals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <MealSection>
            <Card>
                <ul>{mealList}</ul>
            </Card>
        </MealSection>
    );
};

export default AvailableMeals;

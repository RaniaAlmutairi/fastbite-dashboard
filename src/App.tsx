import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./Layouts/DashboardLayout";
import { MealsList } from "./pages/meals/list";
import { MealsCreate } from "./pages/meals/create";
import { MealsEdit } from "./pages/meals/edit";
import { MealsShow } from "./pages/meals/show";
import { CheckoutPage } from "./pages/customer/checkout";

import { Login } from "./pages/auth/Login";
import { RegisterCustomer } from "./pages/auth/RegisterCustomer";

import { MealsForCustomers } from "./pages/customer/MealsForCustomers";
import { ThankYouPage } from "./pages/customer/ThankYouPage";

import { Refine } from "@refinedev/core";
import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "./utility/supabaseClient";

import { OrdersList } from "./pages/orders/list";
import { OrdersShow } from "./pages/orders/show";
import { OrdersEdit } from "./pages/orders/edit";
import { OrdersCreate } from "./pages/orders/create";


const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(supabaseClient)}
            resources={[
                {
                    name: "meals",
                    list: "/meals",
                    create: "/meals/create",
                    edit: "/meals/edit/:id",
                    show: "/meals/show/:id",
                },
            ]}
        >
            <BrowserRouter>
                <Routes>
                    {/* 👨‍💼 Admin Layout */}
                    <Route element={<DashboardLayout />}>
                        <Route index element={<MealsList />} />
                        <Route path="/meals" element={<MealsList />} />
                        <Route path="/meals/create" element={<MealsCreate />} />
                        <Route path="/meals/edit/:id" element={<MealsEdit />} />
                        <Route path="/meals/show/:id" element={<MealsShow />} />
                        <Route path="/orders" element={<OrdersList />} />
                        <Route path="/orders/create" element={<OrdersCreate />} />
                        <Route path="/orders/show/:id" element={<OrdersShow />} />
                        <Route path="/orders/edit/:id" element={<OrdersEdit />} />
                    </Route>

                    {/* 👥 Customer Public Pages (بدون لوحة تحكم) */}
                    <Route path="/menu" element={<MealsForCustomers />} />
                    <Route path="/customer/checkout" element={<CheckoutPage />} />
                    <Route path="/customer/thanks" element={<ThankYouPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterCustomer />} />

                    

                </Routes>
            </BrowserRouter>
        </Refine>
    );
};

export default App;

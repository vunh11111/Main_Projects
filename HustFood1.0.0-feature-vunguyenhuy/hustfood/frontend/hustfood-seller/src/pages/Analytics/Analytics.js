import React, { useRef, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import UserChart from '../../components/Chart/UserChart';
import SalesChart from '../../components/Chart/SalesChart';
import '../../assets/analytics.css';
import '../../assets/base.css';

function Analytics() {
  return (
    <>
      <input type="checkbox" id="navbar-toggle" />
      <Navbar />
      <div className="main-content">
        <Header />
        <main>
          <div className="cards">
            <Card iconClass="la-users" number="3,281" label="Tổng số khách hàng" className="users" />
            <Card iconClass="la-envelope" number="1,985" label="Tổng số đơn hàng" className="orders" />
            <Card iconClass="la-shopping-cart" number="865" label="Tổng số sản phẩm" className="prod" />
          </div>
          <div className="chart-grid">
            <UserChart />
            <SalesChart />
          </div>
        </main>
      </div>
      <label htmlFor="navbar-toggle" className="body-label"></label>
    </>
  );
}

export default Analytics;

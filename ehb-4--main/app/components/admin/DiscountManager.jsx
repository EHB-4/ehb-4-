import React, { useState } from "react";
import APIAgent from "@/agents/APIAgent";

const DISCOUNT_TYPES = [
  { value: "PERCENTAGE", label: "Flat %" },
  { value: "FIXED", label: "Fixed Amount" },
  { value: "BOGO", label: "Buy 1 Get 1 Free" },
  { value: "FREE_SHIPPING", label: "Free Shipping" },
];
const SQL_LEVELS = ["Free", "Basic", "Normal", "High", "VIP"];

const DiscountManager = () => {
  // Discount form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState(DISCOUNT_TYPES[0].value);
  const [value, setValue] = useState("");
  const [target, setTarget] = useState("all");
  const [categories, setCategories] = useState([]); // mock
  const [products, setProducts] = useState([]); // mock
  const [sqlLevel, setSqlLevel] = useState(SQL_LEVELS[0]);
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [description, setDescription] = useState("");
  const [discountMsg, setDiscountMsg] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);

  // Coupon form state
  const [couponCode, setCouponCode] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [couponMinOrder, setCouponMinOrder] = useState("");
  const [couponSqlLevel, setCouponSqlLevel] = useState(SQL_LEVELS[0]);
  const [couponExpiry, setCouponExpiry] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  // Mock category/product options
  const categoryOptions = ["electronics", "wearables", "fashion", "home"];
  const productOptions = ["Smartwatch S7", "Laptop Pro", "Eco Bottle", "Wireless Earbuds"];

  // Discount submit
  const handleDiscountSubmit = async (e) => {
    e.preventDefault();
    setDiscountMsg("");
    setDiscountLoading(true);
    try {
      const body = {
        type,
        value: Number(value),
        target,
        categories: target === "category" ? categories : [],
        products: target === "product" ? products : [],
        sqlLevel,
        validFrom,
        validTo,
        description,
        title,
      };
      const res = await APIAgent.post("/discounts/create", body);
      if (res.data.success) {
        setDiscountMsg("Discount created successfully!");
      } else {
        setDiscountMsg(res.data.error || "Failed to create discount");
      }
    } catch (err) {
      setDiscountMsg(err?.response?.data?.error || "Failed to create discount");
    } finally {
      setDiscountLoading(false);
    }
  };

  // Coupon submit
  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    setCouponMsg("");
    setCouponLoading(true);
    try {
      const body = {
        code: couponCode,
        value: Number(couponValue),
        minOrderAmount: Number(couponMinOrder),
        sqlLevel: couponSqlLevel,
        expiresOn: couponExpiry,
      };
      const res = await APIAgent.post("/coupons/create", body);
      if (res.data.success) {
        setCouponMsg("Coupon created successfully!");
      } else {
        setCouponMsg(res.data.error || "Failed to create coupon");
      }
    } catch (err) {
      setCouponMsg(err?.response?.data?.error || "Failed to create coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  // Auto-generate coupon code
  const generateCouponCode = () => {
    const code =
      "EID" +
      Math.random().toString(36).substr(2, 4).toUpperCase() +
      (couponSqlLevel === "VIP" ? "VIP" : "");
    setCouponCode(code);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🎯 Create New Discount</h2>
      <form onSubmit={handleDiscountSubmit} className="mb-8">
        <label className="block font-semibold mb-1">🔤 Discount Title:</label>
        <input
          className="w-full border rounded px-2 py-1 mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label className="block font-semibold mb-1">💰 Discount Type:</label>
        <select
          className="w-full border rounded px-2 py-1 mb-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {DISCOUNT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <label className="block font-semibold mb-1">🎯 Target:</label>
        <div className="flex gap-3 mb-3">
          <label><input type="radio" name="target" value="all" checked={target === "all"} onChange={() => setTarget("all")} /> All Products</label>
          <label><input type="radio" name="target" value="category" checked={target === "category"} onChange={() => setTarget("category")} /> Specific Categories</label>
          <label><input type="radio" name="target" value="product" checked={target === "product"} onChange={() => setTarget("product")} /> Specific Products</label>
        </div>
        {target === "category" && (
          <select
            multiple
            className="w-full border rounded px-2 py-1 mb-3"
            value={categories}
            onChange={(e) => setCategories(Array.from(e.target.selectedOptions, o => o.value))}
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        )}
        {target === "product" && (
          <select
            multiple
            className="w-full border rounded px-2 py-1 mb-3"
            value={products}
            onChange={(e) => setProducts(Array.from(e.target.selectedOptions, o => o.value))}
          >
            {productOptions.map((prod) => (
              <option key={prod} value={prod}>{prod}</option>
            ))}
          </select>
        )}
        <label className="block font-semibold mb-1">🏷️ SQL Level Target:</label>
        <select
          className="w-full border rounded px-2 py-1 mb-3"
          value={sqlLevel}
          onChange={(e) => setSqlLevel(e.target.value)}
        >
          {SQL_LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
        <label className="block font-semibold mb-1">💲 Discount Value:</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 mb-3"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <div className="flex gap-3 mb-3">
          <div>
            <label className="block font-semibold mb-1">📆 Start Date:</label>
            <input type="date" className="border rounded px-2 py-1" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} required />
          </div>
          <div>
            <label className="block font-semibold mb-1">End Date:</label>
            <input type="date" className="border rounded px-2 py-1" value={validTo} onChange={(e) => setValidTo(e.target.value)} required />
          </div>
        </div>
        <label className="block font-semibold mb-1">💬 Description/Terms:</label>
        <textarea
          className="w-full border rounded px-2 py-1 mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {discountMsg && <div className="mb-2 text-sm text-ehb-primary">{discountMsg}</div>}
        <div className="flex gap-3 mt-2">
          <button type="submit" className="bg-ehb-primary text-white px-4 py-2 rounded disabled:opacity-50" disabled={discountLoading}>
            {discountLoading ? "Saving..." : "📨 Save Discount"}
          </button>
          <button type="button" className="bg-gray-200 text-gray-800 px-4 py-2 rounded" onClick={() => window.location.href = "/admin/discounts"}>
            📋 View Active Discounts
          </button>
        </div>
      </form>
      {/* Coupon Code Manager */}
      <h2 className="text-lg font-bold mb-2">🔁 Coupon Code Manager</h2>
      <form onSubmit={handleCouponSubmit} className="mb-4">
        <label className="block font-semibold mb-1">🎫 Code:</label>
        <div className="flex gap-2 mb-3">
          <input
            className="w-full border rounded px-2 py-1"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            required
          />
          <button type="button" className="bg-gray-200 text-gray-800 px-2 py-1 rounded" onClick={generateCouponCode}>
            🔄 Generate Automatically
          </button>
        </div>
        <label className="block font-semibold mb-1">💲 Discount Value (%):</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 mb-3"
          value={couponValue}
          onChange={(e) => setCouponValue(e.target.value)}
          required
        />
        <label className="block font-semibold mb-1">🎯 Target: Orders Above $</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1 mb-3"
          value={couponMinOrder}
          onChange={(e) => setCouponMinOrder(e.target.value)}
          required
        />
        <label className="block font-semibold mb-1">🔐 SQL Level:</label>
        <select
          className="w-full border rounded px-2 py-1 mb-3"
          value={couponSqlLevel}
          onChange={(e) => setCouponSqlLevel(e.target.value)}
        >
          {SQL_LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
        <label className="block font-semibold mb-1">⏰ Expiry:</label>
        <input
          type="date"
          className="w-full border rounded px-2 py-1 mb-3"
          value={couponExpiry}
          onChange={(e) => setCouponExpiry(e.target.value)}
          required
        />
        {couponMsg && <div className="mb-2 text-sm text-ehb-primary">{couponMsg}</div>}
        <div className="flex gap-3 mt-2">
          <button type="submit" className="bg-ehb-primary text-white px-4 py-2 rounded disabled:opacity-50" disabled={couponLoading}>
            {couponLoading ? "Saving..." : "📥 Save Coupon"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiscountManager; 
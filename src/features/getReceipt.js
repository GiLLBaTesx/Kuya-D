import React from "react";
import jsPDF from 'jspdf';

function getReceipt(currentDate, fname, lname, contact, address, country, user) {
  // Create a new jsPDF instance
  const doc = new jsPDF();
  
  // Set the receipt header
  doc.setFontSize(18);
  doc.text('Kuya D Specialties', 20, 20);
  doc.setFontSize(12);
  doc.text('123 Main Street', 20, 30);
  doc.text('New York, NY 10001', 20, 35);
  doc.text('Phone: 0928 995 1778', 20, 40);
  doc.text('Email: info@myonlinestore.com', 20, 45);
  doc.line(20, 50, 190, 50);
  
  // Set the receipt details
  doc.setFontSize(16);
  doc.text('Receipt', 20, 60);
  doc.setFontSize(12);
  doc.text(`Date: ${currentDate.toLocaleDateString()}`, 20, 70);
  doc.text(`Time: ${currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`, 20, 75);
  doc.text(`Customer Name: ${fname} ${lname}`, 20, 80);
  doc.text(`Contact Number: ${contact}`, 20, 85);
  doc.text(`Address: ${address}, ${country}`, 20, 90);
  doc.line(20, 95, 190, 95);
  
  // Set the receipt items
  const items = user.cart.items;
  let y = 105;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    doc.text(item.title, 20, y);
    doc.text(`x${item.quantity}`, 130, y);
    doc.text(`$${item.price.toFixed(2)}`, 150, y);
    y += 5;
  }
  doc.line(20, y, 190, y);
  y += 5;
  doc.text(`Total: $${user.cart.total.toFixed(2)}`, 130, y);
  
  // Save the receipt as a PDF file
  doc.save('receipt.pdf');
}

export default getReceipt;

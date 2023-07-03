import React from "react";
import { Link } from "wouter";
import { Category } from "../../../../domain";
import "./ListCategories.scss";

interface ListCategoriesProps {
  categories: Category[];
}

export function ListCategories({ categories }: ListCategoriesProps) {
  return (
    <ul className="ListCategories">
      {categories.map((category) => (
        <Link to={`/categories/${category.id.value}`}>
          <li key={category.id.value}>
            <span
              className="bullet"
              style={{ backgroundColor: category.color }}
            ></span>
            <span className="title">{category.title}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
}

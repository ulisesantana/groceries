import React from "react";
import { Link } from "wouter";
import { Category } from "../../../../domain";
import "./ListCategories.scss";
import { messages } from "../../../../messages";
import { routes } from "../../routes";

interface ListCategoriesProps {
  categories: Category[];
}

export function ListCategories({ categories }: ListCategoriesProps) {
  return categories.length ? (
    <ul className="ListCategories">
      {categories.map((category) => (
        <Link to={`/categories/details/${category.id.value}`}>
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
  ) : (
    <div className="padded-info">
      <span>{messages.categoryList.empty.message}</span>
      <span>
        <a
          href={routes.categories.create}
          aria-label={messages.categoryList.empty.cta}
        >
          <button>{messages.categoryList.empty.cta}</button>
        </a>
      </span>
    </div>
  );
}

import { FormEvent, useRef } from "react";
import { Id, Item } from "../../../../domain";

// TODO: Validate item exist by comparing name and id
// Same name and different id is invalid, but same name and same id is OK
function ItemForm({ item }: { item?: Item }) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const itemToSave = {
        id: item?.id || new Id(),
        name: formData.get("name") as string,
        category: formData.get("category") as string,
        isRequired: Boolean(formData.get("isRequired")),
        isMandatory: Boolean(formData.get("isMandatory")),
        quantity: Number(formData.get("quantity")),
      };
      // Haz lo que quieras con item aquí
      console.log(itemToSave);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label>
        Id:
        <input type="text" name="id" defaultValue={item?.id.value} />
      </label>
      <label>
        Name:
        <input type="text" name="name" defaultValue={item?.name} />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          defaultValue={item?.category.id.value}
        />
      </label>
      <label>
        Is Required:
        <input
          type="checkbox"
          name="isRequired"
          defaultChecked={item?.isRequired}
        />
      </label>
      <label>
        Is Mandatory:
        <input
          type="checkbox"
          name="isMandatory"
          defaultChecked={item?.isMandatory}
        />
      </label>
      <label>
        Quantity:
        <input type="number" name="quantity" defaultValue={item?.quantity} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

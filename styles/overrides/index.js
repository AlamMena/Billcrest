import { defaultEqualityCheck } from "reselect";
import Card from "./card";
import Button from "./button";

export default function ComponentsOverrides(theme) {
  return Card(theme);
}

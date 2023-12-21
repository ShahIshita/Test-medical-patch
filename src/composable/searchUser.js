import { ref } from "vue";

export default function useSearch() {
  const searchUserString = ref("");

  // Define the searchUser method
  const searchUser = (value, search) => {
    return (
      value != null &&
      search != null &&
      typeof value === "string" &&
      value
        .trim()
        .toString()
        .toLocaleUpperCase()
        .indexOf(search.toLocaleUpperCase()) !== -1
    );
  };

  // Return the necessary values and methods
  return {
    searchUserString,
    searchUser,
  };
}

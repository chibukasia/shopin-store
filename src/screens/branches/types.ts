type OperationalHours = {
    monday_opens: string;
    monday_closes: string;
    tuesday_opens: string;
    tuesday_closes: string;
    wednesday_opens: string;
    wednesday_closes: string;
    thursday_opens: string;
    thursday_closes: string;
    friday_opens: string;
    friday_closes: string;
    saturday_opens: string;
    saturday_closes: string;
    sunday_opens: string;
    sunday_closes: string;
  };
  
  export type BranchFormData = {
    branch_name: string;
    county_or_province: string;
    address: string;
    town?: string;
    description?: string;
    user_id: string; // Assuming it's an ID, change to `number` if needed
    store_id: string; // Assuming it's an ID, change to `number` if needed
    operational_hours: OperationalHours;
  };
  
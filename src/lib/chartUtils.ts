
export interface AnalyticsData {
    labels: string[];
    data: number[];
  }
  
export const createChartData = (analytics: AnalyticsData,title:string) => {
    const { labels, data } = analytics;
  
    // Map labels and data to the desired structure
    return labels.map((label, index) => ({
      dataType: label,
      [title]: data[index],
      fill: `var(--color-${label.replace(/\s+/g, '-')})`, // Replace spaces with dashes for CSS variable names
    }));
  };
  
export  const createChartConfig = (arr: string[],label:string) => {
    // Base object with the static "analytics" key
    const output: any = {
      [label]: {
        label: label,
      },
    };
  
    // Keys to be used dynamically in the output object
    const dynamicKeys = arr;
  
    // Iterate over the array and create mappings
    arr.forEach((item, index) => {
      output[dynamicKeys[index]] = {
        label: item,
        color: `hsl(var(--chart-${index + 1}))`, // Dynamically assigns colors
      };
    });
  
    return output;
  };
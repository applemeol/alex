interface CompleteObject {
    property1: string;
    property11?: string;
    property12?: string;
    property2: number;
    property3: boolean;
  }

  interface PartObject {
    property1: string;
  }

  const defaultObject: CompleteObject = {
    property1: 'defaultValue',
    property2: 0,
    property3: false,
  };

  const partialObject: Partial<CompleteObject> = {
    property1: 'customValue',
    property12: 'my new props',
  };
  
  const populateComplete:CompleteObject ={
    ...partialObject
  } as CompleteObject;

  console.log(`MEOL THE COMPLETE ${JSON.stringify(populateComplete)}`);
  console.log(`MEOL THE COMPLETE ${JSON.stringify(populateComplete.property1)}`);
  console.log(`MEOL THE COMPLETE ${JSON.stringify(populateComplete.property12)}`);
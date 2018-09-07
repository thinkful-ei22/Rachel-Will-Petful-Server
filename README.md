This API uses queue's to organize cat and dog data.

For cats and dog, each queue shows the animal next in line when the respective get endpoint is accessed.

example request/response: GET dogs -> {
                                       imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
                                       imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
                                        name: 'Fluffy',
                                       sex: 'Female',
                                       age: 2,
                                        breed: 'Bengal',
                                       story: 'Thrown on the street'
   }

When a dog or cat is adopted, the respective delete endpoint is reached which dequeues the respective queue.

example request/response: DELETE dogs -> [no response*]


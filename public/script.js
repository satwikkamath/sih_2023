

const getData = async () => {

  let p = await fetch('/predict')
  let response = await p.json()
  return response
}
let bar_data
let result
document.querySelector("#predict").addEventListener("click", function () {

  const mainFunc = async () => {
    let data1 = await getData()
    // console.log(data.results[0])
    res = data1.results[0]


    res = res.slice(1, res.length - 1)
    res = res.split(",")
    result = res.map(str => {
      return parseInt(str, 10);
    });


    var ctx = document.getElementById('myChart').getContext('2d');

    // Define your data and labels
    var data = {
      labels: ['neem', 'pipran', 'rain tree'],
      datasets: [{
        label: 'Data Set',
        data: result, // Replace with your data values
        backgroundColor: 'rgba(75, 192, 192, 1)', // Color for bars or points
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1 // Border width
      }]
    };

    // Create a chart
    var myChart = new Chart(ctx, {
      type: 'bar', // Specify the chart type (e.g., 'bar', 'line', 'pie')
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true // Start the y-axis at zero
          }
        }
      }
    });

    //to generate pdf
    function generatePDF() {
      var pdfObject = jsPDFInvoiceTemplate.default(props); //returns number of pages created
      console.log(pdfObject)
    }

      NeemTrees=    [1, "Neem", "From a top view, a neem tree displays a wide, round crown with dense, dark green foliage and a straight trunk with a dense branching pattern." ]
      pipranTrees = [2, "Pipran", "From a top view, a pipal tree showcases a broad, circular crown with lush, green foliage and a straight trunk featuring dense branching." ]
      raintree=   [3, "Rain Tree", "A top view of a rain tree reveals a sprawling crown with delicate, fern-like leaves and a wide-spreading canopy supported by a sturdy trunk and extensive branching."]
      NeemTrees.push(result[0])
      pipranTrees.push(result[1])
      raintree.push(result[2])

    var props = {
      outputType: jsPDFInvoiceTemplate.OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "Report",
      orientationLandscape: false,
      compress: true,
      logo: {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
        type: 'PNG', //optional, when src= data:uri (nodejs case)
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
          top: 0, //negative or positive num, from the current position
          left: 0 //negative or positive num, from the current position
        }
      },
      stamp: {
        inAllPages: true, //by default = false, just in the last page
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        type: 'JPG', //optional, when src= data:uri (nodejs case)
        width: 20, //aspect ratio = width/height
        height: 20,
        margin: {
          top: 0, //negative or positive num, from the current position
          left: 0 //negative or positive num, from the current position
        }
      },

      contact: {

        name: "Tree Tally",
        address: "Albania, Tirane, Astir",
        phone: "(+355) 069 22 22 222",
        email: "client@website.al",
        otherInfo: "www.website.al",
      },
      invoice: {
        label: "Report #: ",
        num: 2,

        invGenDate: "Report Date: 22/09/202 10:17",
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "#",
            style: {
              width: 10
            }
          },
          {
            title: "Species",
            style: {
              width: 30
            }
          },
          {
            title: "Description",
            style: {
              width: 80
            }
          },

          { title: "No of Trees detected" },

        ],
        table:  [
          NeemTrees,pipranTrees,raintree
      ],
        additionalRows: [{
          col1: 'Total:',
          col2: '145,250.50',
          col3: 'ALL',
          style: {
            fontSize: 14 //optional, default 12
          }
        },
        {
          col1: 'VAT:',
          col2: '20',
          col3: '%',
          style: {
            fontSize: 10 //optional, default 12
          }
        },
        {
          col1: 'SubTotal:',
          col2: '116,199.90',
          col3: 'ALL',
          style: {
            fontSize: 10 //optional, default 12
          }
        }],
        invDescLabel: "Report Note",
        invDesc: "© 2023 Tree Tally International. All rights reserved. Tree Tally International, the Tree Tally International logo and all other credentials are the sole property of Tree Tally International and may be used only by permission.Item 1182 Rev. 10/2028",
      },
      footer: {
        text: "The report is created on a computer and is valid without the signature and stamp.",
      },
      pageEnable: true,
      pageLabel: "Page ",
    };
    generatePDF()
  }
  mainFunc()
  console.log(result)
})
// console.log(bar_data)

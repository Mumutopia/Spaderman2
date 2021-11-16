//  const board2 = [
//     ["","","","","","","","","","",],
//     ["","","","","","","","","","",],
//     ["","","","","","","","","","",],
//     ["","","","","","","","","","",],
//     ["","","","","","","","","","",],
//     ["","","","","","","","","","",],
//     ["","","","","","","","","","",],
//     ["","","","","","","","","","",],
//     ["","","","","","","","","","",],
//     ["","","","","","","","","","",],
// ]

export const board = [["K", "K", 'R', "K", "K", 'GR', 'B', 'B', "K", 'BR'],
    ["K", "K", 'B', 'R', 'BR', "K", "K", "K", 'R', 'BR'],
 ['BR', 'BR', "K", "K", "K", 'R', 'R', 'R', 'R', 'B'],
["K", "K", 'B', "K", 'B', "K", 'R', 'BR', 'R', "K"],
 ["K", 'BR', 'R', 'BR', 'B', 'R', 'BR', 'BR', 'R', 'R'],
 ["K", "K", 'BR', 'R', 'BR', "K", 'BR', "K", 'BR', 'BR'],
 ['BR', 'R', "K", "K", 'BR', "K", 'BR', "K", "K", 'B'],
 ['GR', "K", 'B', "K", 'B', 'BR', "K", "K", 'R', "K"],
 ["K", "K", "K", 'GR', 'R', "K", 'BR', 'BR', "K", "K"],
 ['B', 'GR', "K", "K", 'R', "K", "K", 'BR', 'BR', "K"]]

// function randomizeBoardContent() {
//     //put items randomly  inside the boards  : rubies and bombs
//     for (let i = 0; i < board2.length; i++) {
//       for (let j = 0; j < board2[i].length; j++) {
//         board2[i][j] = Math.floor(Math.random() * 10);
//         if (board2[i][j] < 2) {
//           board2[i][j] = "R";
//         } else if (board2[i][j] < 4) {
//           board2[i][j] = "BR";
//         } else if (board2[i][j] < 5) {
//           board2[i][j] = "GR";
//         } else if (board2[i][j] < "K") {
//           board2[i][j] = "B";
//         }
//       }
//     }
    
//   }
 
//   randomizeBoardContent()

//   export  const board = board2
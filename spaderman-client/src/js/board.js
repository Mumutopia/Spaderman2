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

export const board = [[8, 9, 'R', 7, 6, 'GR', 'B', 'B', 9, 'BR'],
    [8, 8, 'B', 'R', 'BR', 9, 7, 6, 'R', 'BR'],
 ['BR', 'BR', 9, 9, 9, 'R', 'R', 'R', 'R', 'B'],
[8, 9, 'B', 6, 'B', 8, 'R', 'BR', 'R', 7],
 [8, 'BR', 'R', 'BR', 'B', 'R', 'BR', 'BR', 'R', 'R'],
 [9, 8, 'BR', 'R', 'BR', 7, 'BR', 9, 'BR', 'BR'],
 ['BR', 'R', 6, 8, 'BR', 9, 'BR', 7, 8, 'B'],
 ['GR', 8, 'B', 7, 'B', 'BR', 6, 8, 'R', 7],
 [6, 9, 7, 'GR', 'R', 9, 'BR', 'BR', 9, 8],
 ['B', 'GR', 9, 8, 'R', 7, 6, 'BR', 'BR', 8]]

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
//         } else if (board2[i][j] < 6) {
//           board2[i][j] = "B";
//         }
//       }
//     }
    
//   }
 
//   randomizeBoardContent()

//   export  const board = board2
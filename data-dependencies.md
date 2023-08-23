```mermaid
flowchart LR;
    SF1(Semi-final 1)
    SF2(Semi-final 2)
    F(Final)
    BF(Bronze Final)
    QF1(Quarter Final 1)
    QF2(Quarter Final 2)
    QF3(Quarter Final 3)
    QF4(Quarter Final 4)


    QF1 -->|Winner| SF1
    QF2 -->|Winner| SF1
    QF3 -->|Winner| SF2
    QF4 -->|Winner| SF2
    SF1 -->|Winner| F
    SF2 -->|Winner| F
    SF1 -->|Loser| BF
    SF2 -->|Loser| BF


```
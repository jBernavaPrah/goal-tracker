<?php

namespace App\GraphQL\Queries;

use App\Models\Game;
use App\Models\Player;
use App\Models\Team;
use Illuminate\Database\Eloquent\Builder;

class Statistics
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
//        player: String!
//    wins: Int!
//    losses: Int!
//    "Games Played/Win"
//    ratio: Int!
//    "Goals For"
//    goalsFor: Int!
//    "Goals Against"
//    goalsAgainst: Int!
//    "Goals Difference"
//    goalDifference: Int!


        return Team::get()
            ->map(function (Team $team) {
            return [
                "name" => $team->name,
                "wins" => $team->total_wins,
                "losses" => $team->total_losses,
                "ratio" => $team->ratio_wins,
                "goalsFor" => $team->goals_for,
                "goalsAgainst" => $team->goals_against,
                "goalDifference" => $team->goals_for - $team->goals_against
            ];
        })->sortByDesc("ratio")
            ->toArray();
    }
}

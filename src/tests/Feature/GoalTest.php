<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\Goal;
use App\Models\Player;
use App\Models\Team;
use Tests\TestCase;

class GoalTest extends TestCase
{

    public function test_delete()
    {
        $goal = Goal::factory()->create();

        $this->graphQL(/** @lang GraphQL */ '
        mutation ($id:ID!) {
        deleteGoal(id:$id){id}
        }
        ', [
            'id' => $goal->id
        ])->assertJson([
            'data' => [
                'deleteGoal' => [
                    'id' => $goal->id
                ]
            ]
        ]);

        $this->assertModelMissing($goal);

    }


    /**
     *
     * @return void
     */
    public function test_creation()
    {

        $player = Player::factory()->create();

        $this->graphQL(/** @lang GraphQL */ '
        mutation ($player:ID! ) {
        createGoal(input: {player: $player}){
            id, player {id}
        }
        }
        ', [
            'player' => $player->id
        ])->assertJson([
            'data' => [
                'createGoal' => [
                    'player' => [
                        'id' => $player->id
                    ]
                ]
            ]
        ]);

    }
}
